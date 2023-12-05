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

const BY_NAME = 'byName';
const BY_LENGTH = 'byLength';

function sortByType(goods: string[], sortType: string, isReversed: boolean) {
  const goodsCopy = [...goods];

  if (sortType) {
    switch (sortType) {
      case BY_NAME:
        goodsCopy.sort((a, b) => a.localeCompare(b));
        break;
      case BY_LENGTH:
        goodsCopy.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }
  }

  if (isReversed) {
    goodsCopy.reverse();
  }

  return goodsCopy;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sortedItems = sortByType(goodsFromServer, sortType, isReversed);

  const sortByName = () => {
    setSortType(BY_NAME);
  };

  const sortByLength = () => {
    setSortType(BY_LENGTH);
  };

  const makeReversed = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortType !== BY_NAME })}
          onClick={sortByName}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button', 'is-success', { 'is-light': sortType !== BY_LENGTH },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={makeReversed}
        >
          Reverse
        </button>

        {(sortType || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {sortedItems.map(good => (
          <li data-cy="Good" key={good}>{ good }</li>
        ))}
      </ul>
    </div>
  );
};
