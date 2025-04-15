import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

type Goods = string[];
type Reversed = boolean;

export const goodsFromServer: Goods = [
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
  None = '',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

function getPreparedGoods(
  goods: Goods,
  sortType: SortType,
  isReversed: Reversed,
) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.Alphabetically:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.None);
  const [isReversed, setIsReversed] = useState(false);
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);

  const startReset = () => {
    setSortField(SortType.None);
    setVisibleGoods([...goodsFromServer]);
    setIsReversed(false);
  };

  const handleSort = (styleSort: SortType) => {
    setSortField(styleSort);

    setVisibleGoods(
      getPreparedGoods([...goodsFromServer], styleSort, isReversed),
    );
  };

  const handleSetReversed = () => {
    setIsReversed(prev => {
      const newReversed = !prev;

      setVisibleGoods(
        getPreparedGoods(goodsFromServer, sortField, newReversed),
      );

      return newReversed;
    });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.Length ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleSetReversed}
        >
          Reverse
        </button>

        {(!sortField && !isReversed) || (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={startReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(el => (
          <li data-cy="Good" key={el}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};
