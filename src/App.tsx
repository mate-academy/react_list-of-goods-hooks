import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

enum SortBy {
  SORT_BY_NAME = 'name',
  SORT_BY_LENGTH = 'length',
}

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
  sortReverse: true | false,
  sortField: string,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1: string, good2: string) => {
      switch (sortField) {
        case SortBy.SORT_BY_NAME:
          return good1.localeCompare(good2);
        case SortBy.SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (sortReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [sortReverse, setSortReverse] = useState(false);
  const visibleGoods
  = getPreparedGoods(goodsFromServer, sortReverse, sortField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SortBy.SORT_BY_NAME })}
          onClick={() => {
            setSortField(SortBy.SORT_BY_NAME);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SortBy.SORT_BY_LENGTH })}
          onClick={() => {
            setSortField(SortBy.SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': sortReverse !== true })}
          onClick={() => {
            setSortReverse(!sortReverse);
          }}
        >
          Reverse
        </button>
        {(sortReverse === true || sortField !== '') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setSortReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>))}
      </ul>
    </div>
  );
};
