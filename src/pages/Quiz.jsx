import { 
    useEffect, 
    useState,
    useContext
} from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutContext } from '../components/Layout';

const fisherYates = (toShuffle = []) => {
  for (let i = toShuffle.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [toShuffle[i], toShuffle[randomIndex]] = [
      toShuffle[randomIndex],
      toShuffle[i],
    ];
  }
  return toShuffle;
};

export default function Quiz() {
  const navigate = useNavigate();
  const { kanaData, bestStreak, setBestStreak } = useContext(LayoutContext);
  
  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [inputFormData, setInputFormData] = useState('');

  const [quizOver, setQuizOver] = useState(false);
  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    if (kanaData.length === 0) {
      navigate('/');
    } else {
      setQuizData(fisherYates(kanaData));
    }
  }, [kanaData]);

  console.log(quizData);
  console.log(quizResults);

  const handleForm = (e) => {
    e.preventDefault();

    if (inputFormData == '') {
      return;
    }

    if (quizData[currentIndex] && quizData[currentIndex].romaji === inputFormData) {
      setQuizResults(prevState => [...prevState, { ...quizData[currentIndex], correct: true }]);
      setCurrentStreak((prevState) => prevState + 1);

      if (quizData[currentIndex + 1] == undefined) {
        setBestStreak((prevState) => {
            return currentStreak + 1 > bestStreak ? currentStreak + 1 : prevState;
        });
        localStorage.setItem('bestStreak', currentStreak + 1 > bestStreak ? currentStreak + 1 : bestStreak);
        setQuizOver(true);
      } else {
        setCurrentIndex((prevState) => prevState + 1);
      }
    } else {
      setBestStreak((prevState) => {
        return currentStreak > bestStreak ? currentStreak : prevState;
      });
      localStorage.setItem('bestStreak', currentStreak > bestStreak ? currentStreak : bestStreak);
      setQuizResults(prevState => [...prevState, { ...quizData[currentIndex], correct: false }]);
      setQuizOver(true);
    }

    setInputFormData('');
  };

  const renderResults = quizResults.map((el) => {
    return (
        <div key={el.romaji} className='result-data'>
            <div>{el.kana}</div>
            <div className={el.correct ? 'correct' : 'wrong'}>{el.romaji}</div>
        </div>
    )
  })

  const restartQuiz = () => {
    setCurrentIndex(0);
    setCurrentStreak(0);
    setQuizResults([]);
    setQuizData(fisherYates(kanaData));
    setQuizOver(false);
  }

  return (
    <>
    <div className='scores'>
        <div>score: {currentStreak}</div>
        <div>best score: {bestStreak}</div>
    </div>
      <main>
        {!quizOver ? 
        <>
            {quizData.length > 0 && (
            <div className='kana'>{quizData[currentIndex] && quizData[currentIndex].kana}</div>
            )}
            <form onSubmit={(e) => handleForm(e)}>
                <input
                    type='text'
                    value={inputFormData}
                    onChange={(e) => setInputFormData(e.target.value)}
                />
            </form>
        </> :
        <>
            <div className='results'>{renderResults}</div>
            <div className='results-buttons'>
                <button onClick={restartQuiz}>Restart Quiz</button>
                <button onClick={() => (navigate('/'))}>Change Kana</button>
            </div>
        </>}
      </main>
    </>
  );
}
