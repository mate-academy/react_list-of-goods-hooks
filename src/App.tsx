import React, { useState } from 'react';
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

type GoodList = string[];

function applySort(
  arr: GoodList,
  sortingType: string,
  reversed: boolean,
): GoodList {
  const sortedArray = [...arr];

  switch (sortingType) {
    case 'alphabet':
      sortedArray.sort((a, b) => a.localeCompare(b));
      break;
    case 'length': {
      sortedArray.sort((a, b) => a.length - b.length);
      break;
    }

    default:
      break;
  }

  if (reversed) {
    sortedArray.reverse();
  }

  return sortedArray;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sortGoods = applySort(goodsFromServer, sortType, isReversed);
  const shouldShowReset = sortType || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== 'alphabet',
          })}
          onClick={() => setSortType('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== 'length',
          })}
          onClick={() => setSortType('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {shouldShowReset && (
          <button
            type="button"
            className={cn('button', 'is-danger', { 'is-light': true })}
            onClick={() => {
              setSortType('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {/* <li data-cy="Good">Dumplings</li>
          <li data-cy="Good">Carrot</li>
          <li data-cy="Good">Eggs</li>
          <li data-cy="Good">Ice cream</li>
          <li data-cy="Good">Apple</li>
          <li data-cy="Good">...</li> */}
          {sortGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
