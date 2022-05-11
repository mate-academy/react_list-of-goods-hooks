import React, { useState, useMemo } from 'react';
import './App.css';
import { GoodsList } from './GoodsList';

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

const App: React.FC = () => {
  const limitLength = 1;
  const [goods, setGoods] = useState(goodsFromServer);
  const [isVisible, setIsVisible] = useState(false);
  const [limit, setLimit] = useState(limitLength);
  const filter = (array: string[], value: number) => {
    return array.filter((elem) => elem.length >= value);
  };

  const visibleGoods = useMemo(() => filter(goods, limit), [goods, limit]);

  const visibleList = () => {
    setIsVisible((current) => !current);
  };

  const reverseList = () => {
    setGoods((current) => [...current].reverse());
  };

  const sortByAlphabet = () => {
    setGoods((current) => [...current].sort((g1, g2) => g1.localeCompare(g2)));
  };

  const sortByLength = () => {
    setGoods((current) => [...current].sort((g1, g2) => g1.length - g2.length));
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
  };

  const changeLimit = (event: React.SyntheticEvent<EventTarget>) => {
    setLimit(+(event.target as HTMLSelectElement).value);
  };

  const selectReset = () => {
    setLimit(limitLength);
  };

  return (
    <div className="App">
      <h1 className="App__title">Goods list</h1>
      {!isVisible && (
        <button
          type="button"
          onClick={visibleList}
          className="App__button Button__start"
        >
          Start
        </button>
      )}

      {isVisible && (
        <>
          {visibleGoods.length > 0 && <GoodsList goods={visibleGoods} />}
          <div className="App__buttons">
            <button
              type="button"
              onClick={reverseList}
              className="App__button"
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={sortByAlphabet}
              className="App__button"
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={sortByLength}
              className="App__button"
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={reset}
              className="App__button Button__reset"
            >
              Reset
            </button>
          </div>

          <form className="App__form">
            <select
              value={limit}
              onChange={changeLimit}
              className="App__select"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option value={num} key={num}>{num}</option>
              ))}
            </select>

            <button
              type="button"
              onClick={selectReset}
              className="App__button Button__reset"
            >
              Reset select
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default App;
