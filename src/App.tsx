import React, { useState, useMemo } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList/GoodsList';

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
  const lengthByDefault = 1;
  const [goods, setGoods] = useState(goodsFromServer);
  const [isVisible, setVisible] = useState(false);
  const [limit] = useState(lengthByDefault);

  const filterGoods = (array: string[], value: number) => {
    return array.filter((elem) => elem.length >= value);
  };

  const visibleGoods = useMemo(() => filterGoods(goods, limit),
    [goods, limit]);

  const visibleList = () => {
    setVisible((current) => !current);
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

  return (
    <div className="goods-list">
      {!isVisible && (
        <button
          type="button"
          onClick={visibleList}
          className="goods-list__btn"
        >
          Start
        </button>
      )}

      {isVisible && (
        <>
          {visibleGoods.length > 0 && <GoodsList goods={visibleGoods} />}
          <div className="goods-list__btns">
            <button
              type="button"
              onClick={reverseList}
              className="goods-list__btn"
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={sortByAlphabet}
              className="goods-list__btn"
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={sortByLength}
              className="goods-list__btn"
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={reset}
              className="goods-list__btn"
            >
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
