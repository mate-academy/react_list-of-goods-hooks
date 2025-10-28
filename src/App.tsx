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
  Original = 'original',
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Original);

  const [isReversed, setIsReversed] = useState<boolean>(false);

  const displayedGoods: string[] = [...goodsFromServer];

  const sortedGoods: string[] = [...displayedGoods];

  if (sortType === SortType.Alphabet) {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.Length) {
    sortedGoods.sort((a, b) => {
      if (b.length === a.length) {
        return a.localeCompare(b);
      }

      return a.length - b.length;
    });
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  const handleAlphabetSort = () => {
    setSortType(SortType.Alphabet);
    setIsReversed(false);
  };

  const handleLengthSort = () => {
    setSortType(SortType.Length);
    setIsReversed(false);
  };

  const handleReverseSort = () => {
    setIsReversed(prev => !prev);
  };

  const handleResetList = () => {
    setSortType(SortType.Original);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.Alphabet,
          })}
          onClick={handleAlphabetSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={handleLengthSort}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverseSort}
        >
          Reverse
        </button>

        {(sortType !== SortType.Original || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetList}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
