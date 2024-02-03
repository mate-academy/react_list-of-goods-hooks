import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortType } from './SortType';

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

function getPreparedGoods(
  goods: string[],
  sortOrder: string,
  reverseOrder: boolean,
) {
  const preparedGoods = [...goods];

  if (sortOrder) {
    preparedGoods.sort((good1, good2) => {
      switch (sortOrder) {
        case SortType.ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SortType.BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseOrder) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortOrder, setSortOrder] = useState('');
  const [reverseOrder, setReverseOrder] = useState(false);

  const sortedGoods
    = getPreparedGoods(goodsFromServer, sortOrder, reverseOrder);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortOrder === SortType.ALPHABETICALLY
            ? 'button is-info'
            : 'button is-info is-light'}
          onClick={() => setSortOrder(SortType.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortOrder === SortType.BY_LENGTH
            ? 'button is-success'
            : 'button is-success is-light'}
          onClick={() => setSortOrder(SortType.BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverseOrder
            ? 'button is-warning'
            : 'button is-warning is-light'}
          onClick={() => setReverseOrder(!reverseOrder)}
        >
          Reverse
        </button>

        {(sortOrder || reverseOrder)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortOrder(SortType.RESET);
                setReverseOrder(false);
              }}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
