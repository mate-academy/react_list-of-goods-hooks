import { ChangeEvent, useState } from 'react';
import { GoodsList } from './component/GoodsList';

import './App.scss';

const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const lengthFromServer: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const App: React.FC = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [visibility, setVisibility] = useState(false);
  const [length, setLength] = useState(1);

  const reverseGoods = () => {
    setGoods([...goods].reverse());
  };

  const sortByLength = () => {
    setGoods([...goods].sort((g1, g2) => (
      g1.length - g2.length
    )));
  };

  const sortByAlphabet = () => {
    setGoods([...goods].sort((g1, g2) => (
      g1.localeCompare(g2)
    )));
  };

  const toggleVisibility = () => {
    setVisibility(true);
  };

  const handleSubmit = (event: ChangeEvent<HTMLSelectElement>) => {
    setLength(+event.target.value);
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
    setLength(1);
  };

  const visibleGoods = [...goods].filter(
    good => good.length >= length,
  );

  return visibility === true ? (
    <div className="App">
      <h1>Goods</h1>
      <GoodsList goods={visibleGoods} />

      <select name="good" value={length} onChange={handleSubmit}>
        {lengthFromServer.map(len => (
          <option key={len} value={len}>
            {len}
          </option>
        ))}
      </select>

      <button className="sort__button" type="button" onClick={reverseGoods}>
        reverse
      </button>

      <button className="sort__button" type="button" onClick={sortByLength}>
        Sort by length
      </button>

      <button className="sort__button" type="button" onClick={sortByAlphabet}>
        Sort by Alphabet
      </button>

      <button className="sort__button" type="button" onClick={reset}>
        Reset
      </button>
    </div>
  ) : (
    <div className="wrapper">
      <button className="start" type="button" onClick={toggleVisibility}>
        Start
      </button>
    </div>
  );
};

export default App;
