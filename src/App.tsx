import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortType } from './types/SortTypes';
import { getPreparedGoods } from './utils/getPreparedGoods';
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

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [reverse, setReverse] = useState(false);
  const preparedGoods = getPreparedGoods(goodsFromServer, sortType, reverse);
  const umova = sortType !== SortType.None || reverse;

  function handleSortChange(newSortType: SortType) {
    setSortType(newSortType);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSortChange(SortType.Alphabet)}
          type="button"
          className={`button is-info ${sortType === SortType.Alphabet ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSortChange(SortType.Length)}
          type="button"
          className={`button is-success ${sortType === SortType.Length ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {umova && (
          <button
            onClick={() => {
              setSortType(SortType.None);
              setReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
