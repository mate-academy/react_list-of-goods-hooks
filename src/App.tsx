import * as React from 'react';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

// const SORT_ABC = 'abc';
// const SORT_BY_LENGTH = 'length';

enum SortType {
  Classic = 'NO_SORT',
  Abc = 'SORT_ABC',
  Length = 'SORT_BY_LENGTH',
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

function getItems(items: string[], sortingFlag: SortType, isReverse: boolean) {
  const preparedItems = [...items];

  if (sortingFlag) {
    preparedItems.sort((item1, item2) => {
      switch (sortingFlag) {
        case SortType.Abc:
          return item1.localeCompare(item2);
        case SortType.Length:
          return item1.length - item2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedItems.reverse();
  }

  return preparedItems;
}

export const App: React.FC = () => {
  const [sortFlag, setSortFlag] = useState(SortType.Classic);
  const [isReverse, setIsReverse] = useState(false);
  const visibleItems = getItems(goodsFromServer, sortFlag, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortFlag !== SortType.Abc,
          })}
          onClick={() => setSortFlag(SortType.Abc)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortFlag !== SortType.Length,
          })}
          onClick={() => setSortFlag(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {isReverse || sortFlag !== SortType.Classic ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortFlag(SortType.Classic);
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {visibleItems.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
