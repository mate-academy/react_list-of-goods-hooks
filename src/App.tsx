import React, { useState } from 'react';
import cn from 'classnames';
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
  sortAsc = 'abc',
  sortByLength = 'byLength',
  initialVaue = '',
}

interface SortAndReverse {
  sortedBy: SortType;
  reversed: boolean;
}

const sortFunc = (
  goods: string[],
  { sortedBy, reversed }: SortAndReverse,
) => {
  const arr = [...goods];

  switch (sortedBy) {
    case SortType.sortAsc:
      arr.sort();
      break;

    case SortType.sortByLength:
      arr.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  return reversed
    ? arr.reverse()
    : arr;
};

export const App: React.FC = () => {
  const [reversed, setReversed] = useState(false);
  const [sortedBy, setSortedBy] = useState(SortType.initialVaue);

  const sortedGoods = sortFunc(goodsFromServer, { sortedBy, reversed });

  const resetFunc = () => {
    setReversed(false);
    setSortedBy(SortType.initialVaue);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortedBy(SortType.sortAsc)}
          className={cn('button is-info', {
            'is-light': sortedBy !== SortType.sortAsc,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortedBy(SortType.sortByLength)}
          className={cn('button is-success', {
            'is-light': sortedBy !== SortType.sortByLength,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(!reversed)}
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {(sortedBy || reversed) && (
          <button
            type="button"
            onClick={resetFunc}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
