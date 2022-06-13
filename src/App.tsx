import React, { useState, useMemo } from 'react';
import { GoodsList } from './components/GoodsList';

const goodsLengths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
  const [isVisible, setIsVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [goodsLength, setGoodsLength] = useState(1);
  const [sortGoods, setSortGoodsBy] = useState('');

  const sortByAlphabet = () => {
    setSortGoodsBy('Alphabet');
  };

  const sortByLength = () => {
    setSortGoodsBy('Length');
  };

  const reset = () => {
    setIsReversed(false);
    setSortGoodsBy('');
    setGoodsLength(1);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const goodsList = useMemo(() => {
    return goodsFromServer
      .filter(good => good.length >= goodsLength)
      .sort((first, second) => {
        switch (sortGoods) {
          case 'Alphabet':
            return first.localeCompare(second);

          case 'Length':
            return first.length - second.length;

          default:
            return 0;
        }
      });
  }, [sortGoods, goodsLength]);

  if (isReversed) {
    goodsList.reverse();
  }

  return (
    <div className="App">
      <h1>Goods</h1>
      {!isVisible && (
        <button
          type="button"
          className="button"
          onClick={() => setIsVisible(true)}
        >
          Show this List
        </button>
      )}
      {isVisible && (
        <>
          <div className="select">
            Select length:
            <select
              name="good"
              id="good"
              onChange={event => setGoodsLength(+event.target.value)}
            >
              {goodsLengths.map(length => (
                <option value={length} key={length}>{length}</option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="button"
            onClick={reverse}
          >
            Reverse list
          </button>
          <button
            type="button"
            className="button"
            onClick={sortByAlphabet}
          >
            Sort by letter
          </button>
          <button
            type="button"
            className="button"
            onClick={sortByLength}
          >
            Sort by length
          </button>
          <button
            type="button"
            className="button"
            onClick={reset}
          >
            Reset all
          </button>
          <GoodsList goods={goodsList} />
        </>
      )}
    </div>
  );
};

export default App;
