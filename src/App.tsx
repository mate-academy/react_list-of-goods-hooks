import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import ToggleColorMode from './theme';

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

function orderedGoods(
  goods: string[],
  isReversed: boolean,
  sortType: SortType,
) {
  const goodsOnPage = [...goods];

  if (isReversed) {
    goodsOnPage.reverse();
  }

  switch (sortType) {
    case SortType.ALPHABET:
      return goodsOnPage.sort((first, second) => {
        return first.localeCompare(second);
      });

    case SortType.LENGTH:
      return goodsOnPage.sort((first, second) => {
        return first.length - second.length;
      });

    case SortType.NONE:
      return goodsOnPage;

    default:
      return goodsOnPage;
  }
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const handleSortedAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleSortedLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleReverse = () => {
    setIsReversed(element => !element);
  };

  const handleReset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const goodsOnPage = orderedGoods(goodsFromServer, isReversed, sortType);

  const isResetVisible = isReversed || sortType !== SortType.NONE;

  return (
    <div className="section content">
      <ToggleColorMode />
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={handleSortedAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={handleSortedLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {goodsOnPage.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
