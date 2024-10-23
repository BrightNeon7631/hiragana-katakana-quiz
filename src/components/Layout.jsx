import Header from './Header';
import { Outlet } from 'react-router-dom';
import { 
    useEffect, 
    useState,
    createContext 
} from 'react';
import { 
    hiragana,
    katakana
} from '../data';

export const LayoutContext = createContext(null);

export default function Layout() {
  const [data, setData] = useState(hiragana);
  const [selectedKana, setSelectedKana] = useState([]);
  const [kanaData, setKanaData] = useState([]);
  const [bestStreak, setBestStreak] = useState(0);
  const [dataType, setDataType] = useState(true); // true - hiragana; false - katakana

  // changes kanaData array based on user choices in the Home page
  useEffect(() => {
    const newArray = [];
    selectedKana.forEach((el) => {
      newArray.push(data.filter((dataEl) => dataEl.group === el));
    });
    setKanaData(newArray.flat());
  }, [selectedKana, data]);

  useEffect(() => {
    setBestStreak(parseInt(localStorage.getItem('bestStreak')) || 0);
    if (dataType) {
      setData(hiragana);
    } else {
      setData(katakana);
    }
  }, [dataType]);

  // filters hiragana objects by type
  const hiraganaMain = hiragana.filter((el) => el.type === 'main');
  const hiraganaDakuten = hiragana.filter((el) => el.type === 'dakuten');
  const hiraganaCombination = hiragana.filter(
    (el) => el.type === 'combination'
  );

  // then gets unique group values like あ/a
  const uniqueMainHiragana = [
    ...new Set(hiraganaMain.map((item) => item.group)),
  ];
  const uniqueDakutenHiragana = [
    ...new Set(hiraganaDakuten.map((item) => item.group)),
  ];
  const uniqueCombinationHiragana = [
    ...new Set(hiraganaCombination.map((item) => item.group)),
  ];
  const uniqueMainKatakana = [...new Set(katakana.map((item) => item.group))];

  return (
    <>
      <LayoutContext.Provider
        value={{
          selectedKana,
          setSelectedKana,
          kanaData,
          uniqueMainHiragana,
          uniqueDakutenHiragana,
          uniqueCombinationHiragana,
          bestStreak,
          setBestStreak,
          uniqueMainKatakana,
          dataType,
          setDataType,
        }}
      >
        <Header />
        <Outlet />
      </LayoutContext.Provider>
    </>
  );
}
