import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import React from 'react';

enum SortType {
  Alphabet = 'alphabetically',
  Length = 'by length',
}

interface SortMode {
  isReverse: boolean;
  sortMode: string | null;
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

function formatGoods(goods: string[], { isReverse, sortMode }:SortMode) {
  const data = [...goods];

  switch (sortMode) {
    case ('alphabetically'):
      data.sort((a, b) => a.localeCompare(b));
      break;
    case ('by length'):
      data.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  return isReverse ? data.reverse() : data;
}

export const App : React.FC = () => {
  const [isReverse, setIsReverse] = React.useState(false);
  const [sortMode, setSortMode] = React.useState<string | null>(null);
  const goods = formatGoods(goodsFromServer, { isReverse, sortMode });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortMode !== SortType.Alphabet })}
          onClick={() => setSortMode(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortMode !== SortType.Length })}
          onClick={() => setSortMode(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': !isReverse })}
          onClick={() => setIsReverse(prevIsReverse => !prevIsReverse)}
        >
          Reverse
        </button>

        {(isReverse || sortMode) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReverse(false);
              setSortMode(null);
            }}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
