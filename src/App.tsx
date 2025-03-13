import React from 'react';
import { useState } from 'react';
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
  DEFAULT = '',
  SORT_ALPHABETICALLY = 'Sort alphabetically',
  SORT_BY_LENGTH = 'Sort by length',
}

function getSortedGoods(
  goods: string[],
  action: SortType | '',
  isReversed: boolean = false,
) {
  const sortedGoods = [...goods];

  switch (action) {
    case SortType.SORT_ALPHABETICALLY:
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.SORT_BY_LENGTH:
      sortedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
  }

  return isReversed ? sortedGoods.reverse() : sortedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.DEFAULT);
  const [reversed, setReversed] = useState(false);
  const goods = getSortedGoods(goodsFromServer, sortField, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SortType.SORT_ALPHABETICALLY
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortField(SortType.SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SortType.SORT_BY_LENGTH
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortField(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField !== SortType.DEFAULT || reversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortField(SortType.DEFAULT);
              setReversed(false);
            }}
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
