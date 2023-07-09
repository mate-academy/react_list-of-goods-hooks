import cn from 'classnames';
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
  Abc = 'ABC',
  Length = 'LENGTH',
  None = '',
}

const getPreparedGoods = (
  goods: string[],
  sortField: SortType,
  isReverseField = false,
) => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Abc:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [isReverseField, setIsReverseField] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    isReverseField,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            ' is-light': sortField !== SortType.Abc,
          })}
          onClick={() => setSortField(SortType.Abc)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            ' is-light': sortField !== SortType.Length,
          })}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            ' is-light': !isReverseField,
          })}
          onClick={() => setIsReverseField(!isReverseField)}
        >
          Reverse
        </button>

        {(sortField || isReverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.None);
              setIsReverseField(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
