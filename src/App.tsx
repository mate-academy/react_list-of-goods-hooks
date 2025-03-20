import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

import { GoodsList } from './components/GoodsList/GoodsList';

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

enum SortBy {
  default = '',
  alphabet = 'alphabet',
  length = 'length',
}

interface SortListParams {
  list: string[];
  sortBy: SortBy;
  isReversed: boolean;
}

function sortList(
  list: SortListParams['list'],
  sortBy: SortListParams['sortBy'],
  isReversed: SortListParams['isReversed'],
) {
  let sortedList = [...list];

  if (sortBy) {
    sortedList.sort((good1, good2) => {
      switch (sortBy) {
        case SortBy.alphabet:
          return good1.localeCompare(good2);

        case SortBy.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    sortedList = sortedList.toReversed();
  }

  return sortedList;
}

export const App = () => {
  const [sortField, setSortField] = useState(SortBy.default);
  const [reversed, setReversed] = useState(false);
  const goodsList = sortList(goodsFromServer, sortField, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortBy.alphabet,
          })}
          onClick={() => setSortField(SortBy.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortBy.length,
          })}
          onClick={() => setSortField(SortBy.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField !== '' || reversed === true) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortBy.default);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={goodsList} />
    </div>
  );
};
