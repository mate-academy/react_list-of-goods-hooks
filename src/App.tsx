import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
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

enum SortType {
  Alphabetical = 'Alphabetical',
  Length = 'Length',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState<SortType | null>(null);
  const [isReverse, setIsReverse] = useState(false);

  const sortAlphabetically = () => {
    const sortedGoods = [...goods].sort();

    if (isReverse) {
      setGoods([...sortedGoods].reverse());
    } else {
      setGoods(sortedGoods);
    }

    setSortType(SortType.Alphabetical);
  };

  const sortByLength = () => {
    if (!(sortType === SortType.Length)) {
      const sortedGoods = [...goodsFromServer].sort((a, b) => {
        const lengthComparison = a.length - b.length;

        if (lengthComparison === 0) {
          return 1;
        }

        return lengthComparison;
      });

      if (isReverse) {
        setGoods([...sortedGoods].reverse());
      } else {
        setGoods(sortedGoods);
      }

      setSortType(SortType.Length);
    }
  };

  const reverseGoods = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setIsReverse(!isReverse);
  };

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
    setSortType(null);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${(sortType === SortType.Alphabetical) ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${(sortType === SortType.Length) ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReverse ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {goods.join(',') !== goodsFromServer.join(',') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
