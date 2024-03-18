import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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

enum SortByField {
  abc = 'abc',
  length = 'length',
  reverse = 'reverse',
}

type SortOrder = {
  sortField: string;
  sortReverse: string;
};

function getPreparedGoods(
  goods: string[],
  { sortField, sortReverse }: SortOrder,
) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortByField.abc:
          return good1.localeCompare(good2);

        case SortByField.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (sortReverse) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortReverse, setSortReverse] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    sortReverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cn({ 'is-light': SortByField.abc !== sortField })}`}
          onClick={() => setSortField(SortByField.abc)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${cn({ 'is-light': SortByField.length !== sortField })}`}
          onClick={() => setSortField(SortByField.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': !sortReverse })}`}
          onClick={() =>
            sortReverse
              ? setSortReverse('')
              : setSortReverse(SortByField.reverse)
          }
        >
          Reverse
        </button>

        {(sortField || sortReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setSortReverse('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
