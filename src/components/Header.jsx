import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { LayoutContext } from '../components/Layout';

export default function Header() {
  const { dataType } = useContext(LayoutContext);

  return (
    <header>
      <h1>
        <Link to='/'>{dataType ? 'HIRAGANA' : 'KATAKANA'} QUIZ</Link>
      </h1>
    </header>
  );
}
