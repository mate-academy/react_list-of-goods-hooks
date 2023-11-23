import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  withoutSorting = '',
  alphabetically = 'name',
  byLength = 'length',
}

function getPreparedGoods(
  goods: string[], sortField: SortType, reverseField: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.alphabetically:
          return good1.localeCompare(good2);

        case SortType.byLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SortType.withoutSorting);
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = (
    getPreparedGoods(goodsFromServer, sortField, reverseField)
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button',
              'is-info',
              { 'is-light': sortField !== SortType.alphabetically },
            )
          }
          onClick={() => {
            setSortField(SortType.alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-success',
              { 'is-light': sortField !== SortType.byLength },
            )
          }
          onClick={() => {
            setSortField(SortType.byLength);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-warning',
              { 'is-light': !reverseField },
            )
          }
          onClick={() => {
            setReverseField(!reverseField);
          }}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.withoutSorting);
              setReverseField(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {
          visibleGoods.map(good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
