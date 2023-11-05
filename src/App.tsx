import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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

const sortGoods = (goodsArray: string[], sortType: SortType,
  isReverse: boolean): string[] => {
  let sortedGoods = [...goodsArray];

  switch (sortType) {
    case SortType.Alphabetical:
      sortedGoods = sortedGoods.sort();
      break;
    case SortType.Length:
      sortedGoods = [...goodsFromServer].sort((a, b) => {
        if (a.length - b.length === 0) {
          return 1;
        }

        return a.length - b.length;
      });
      break;
    default:
      return [...goodsFromServer];
  }

  if (isReverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState<SortType | null>(null);
  const [isReverse, setIsReverse] = useState(false);

  const handleSort = (type: SortType) => {
    const sortedGoods = sortGoods([...goods], type, isReverse);

    setGoods(sortedGoods);
    setSortType(type);
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
          onClick={() => handleSort(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={() => handleSort(SortType.Length)}
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

        {((sortType) || (isReverse)) && (
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
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
