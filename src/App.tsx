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
  const [state, setState] = useState({
    goods: [...goodsFromServer],
    isVisible: false,
    length: 1,
  });

  const reverseGoods = () => {
    const reverseGood = {
      ...state,
      goods: [...state.goods].reverse(),
    };

    setState(reverseGood);
  };

  const sortByLength = () => {
    const sortedGood = {
      ...state,
      goods: [...state.goods].sort((g1, g2) => (
        g1.length - g2.length
      )),
    };

    setState(sortedGood);
  };

  const sortByAlphabet = () => {
    const sortedGood = {
      ...state,
      goods: [...state.goods].sort((g1, g2) => (
        g1.localeCompare(g2)
      )),
    };

    setState(sortedGood);
  };

  const toggleVisibility = () => {
    const setVisible = {
      ...state,
      isVisible: true,
    };

    setState(setVisible);
  };

  const handleSubmit = (event: ChangeEvent<HTMLSelectElement>) => {
    const filteredGoods = {
      ...state,
      length: +event.target.value,
    };

    setState(filteredGoods);
  };

  const reset = () => {
    const primaryGoods = {
      goods: [...goodsFromServer],
      isVisible: true,
      length: 0,
    };

    setState(primaryGoods);
  };

  const visibleGoods = [...state.goods].filter(
    good => good.length >= state.length,
  );

  return state.isVisible === true ? (
    <div className="App">
      <h1>Goods</h1>
      <GoodsList goods={visibleGoods} />

      <select name="good" onChange={handleSubmit}>
        {lengthFromServer.map(len => (
          <option value={len}>
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
