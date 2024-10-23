import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LayoutContext } from '../components/Layout';

export default function Home() {
  const navigate = useNavigate();
  const {
    selectedKana,
    setSelectedKana,
    kanaData,
    uniqueMainHiragana,
    uniqueDakutenHiragana,
    uniqueCombinationHiragana,
    uniqueMainKatakana,
    dataType,
    setDataType,
  } = useContext(LayoutContext);

  const handleKanaButton = (item) => {
    if (selectedKana.includes(item)) {
      setSelectedKana((prevState) => prevState.filter((el) => el !== item));
    } else {
      setSelectedKana((prevState) => [...prevState, item]);
    }
  };

  const renderKanaButtons = (unique) => {
    return unique.map((item) => {
      return (
        <button
          key={item}
          onClick={() => handleKanaButton(item)}
          className={selectedKana.includes(item) ? 'selected' : ''}
        >
          {item}
        </button>
      );
    });
  };

  // useful for setting the 'select' class on 'all' buttons
  const containsAll = (unique) => {
    return unique.every((element) => {
      return selectedKana.includes(element);
    });
  };

  const selectAll = (unique) => {
    if (containsAll(unique)) {
      // unselects all
      setSelectedKana((prevState) =>
        prevState.filter((el) => !unique.includes(el))
      );
    } else {
      // selects all
      setSelectedKana((prevState) => {
        const newArray = [...prevState, ...unique];
        return [...new Set(newArray)]; // removes duplicate values i.e. gets unique array values
      });
    }
  };

  const startQuiz = () => {
    if (kanaData.length === 0) {
      alert('You must select at least one group to continue.');
      return;
    }
    navigate('/quiz');
  };

  const switchData = () => {
    setSelectedKana([]);
    setDataType((prevState) => !prevState);
  };

  return (
    <div className='home'>
      <div className='change-type-buttons'>
        <button onClick={switchData} className={dataType ? 'selected' : ''}>
          Hiragana
        </button>
        <button onClick={switchData} className={dataType ? '' : 'selected'}>
          Katakana
        </button>
      </div>
      {dataType ? (
        <>
          <div className='main-kana'>
            <h2>Main Kana</h2>
            <button
              onClick={() => selectAll(uniqueMainHiragana)}
              className={containsAll(uniqueMainHiragana) ? 'selected' : ''}
            >
              All Main Kana
            </button>
            <div className='main-kana-buttons'>
              {renderKanaButtons(uniqueMainHiragana)}
            </div>
          </div>

          <div className='main-kana'>
            <h2>Dakuten Kana</h2>
            <button
              onClick={() => selectAll(uniqueDakutenHiragana)}
              className={containsAll(uniqueDakutenHiragana) ? 'selected' : ''}
            >
              All Dakuten Kana
            </button>
            <div className='dakuten-kana-buttons'>
              {renderKanaButtons(uniqueDakutenHiragana)}
            </div>
          </div>

          <div className='main-kana'>
            <h2>Combination Kana</h2>
            <button
              onClick={() => selectAll(uniqueCombinationHiragana)}
              className={containsAll(uniqueCombinationHiragana) ? 'selected' : ''}
            >
              All Combination Kana
            </button>
            <div className='main-kana-buttons'>
              {renderKanaButtons(uniqueCombinationHiragana)}
            </div>
          </div>
        </>
      ) : (
        <div className='main-kana'>
          <h2>Main Kana</h2>
          <button
            onClick={() => selectAll(uniqueMainKatakana)}
            className={containsAll(uniqueMainKatakana) ? 'selected' : ''}
          >
            All Main Kana
          </button>
          <div className='main-kana-buttons'>
            {renderKanaButtons(uniqueMainKatakana)}
          </div>
        </div>
      )}
      <button className='start-button' onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  );
}
