import React, { useState } from 'react';
import classNames from 'classnames';
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
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  switch (sortType) {
    case 1:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case 2:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    default:
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  // Sort and reverse goods if needed
  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

// DON'T save goods to the state
// type State = {
//   isReversed: boolean,
//   sortType: SortType,
// };

export const App: React.FC = () => {
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(0);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button',
            'is-info', { 'is-light': sortType !== 1 })}
          onClick={() => setSortType(1)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button',
            'is-info', { 'is-light': sortType !== 2 })}
          onClick={() => setSortType(2)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button',
            'is-info', { 'is-light': isReversed === false })}
          onClick={() => setReverse(!isReversed)}
        >
          Reverse
        </button>

        {(sortType !== 0 || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverse(false);
              setSortType(0);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {getReorderedGoods(goodsFromServer,
            { sortType, isReversed }).map(good => (
            // eslint-disable-next-line @typescript-eslint/indent
              <li key={good} data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
