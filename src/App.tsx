import React, { useState, useMemo } from 'react';
import { GoodsList } from './GoodsList/GoodsList';
import './App.css';

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
  const [sortGoods, setSortGoodsBy] = useState('');
  const [goodsLength, setGoodsLength] = useState(1);
  const [isReversed, setIsReversed] = useState(false);

  const sortByAlphabet = () => {
    setSortGoodsBy('Alphabet');
  };

  const sortByLength = () => {
    setSortGoodsBy('Length');
  };

  const reset = () => {
    setGoodsLength(1);
    setIsReversed(false);
    setSortGoodsBy('');
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const goodsList = useMemo(() => {
    return [...goodsFromServer]
      .filter(good => good.length >= goodsLength)
      .sort((first, last) => {
        switch (sortGoods) {
          case 'Alphabet':
            return first.localeCompare(last);

          case 'Length':
            return first.length - last.length;

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
          Show goods
        </button>
      )}
      {isVisible && (
        <>
          <div className="select">
            Choose length for sorting:
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
            Reverse
          </button>
          <button
            type="button"
            className="button"
            onClick={sortByAlphabet}
          >
            Sort alphabetically
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
            Reset
          </button>
          <GoodsList goods={goodsList} />
        </>
      )}
    </div>
  );
};

export default App;
