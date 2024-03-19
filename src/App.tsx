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

export enum SortType {
  Alphabet = 'Alphabet',
  Length = 'Length',
  Default = '',
}

function getPreparedGoods(
  goods: string[],
  sortFile: SortType,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortFile) {
      case SortType.Alphabet:
        return good1.localeCompare(good2);
      case SortType.Length:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortFile, setSortFile] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortFile, isReversed);

  const isSelectionActive = sortFile || isReversed;

  const resetFile = () => {
    setSortFile(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortFile !== SortType.Alphabet,
          })}
          onClick={() => setSortFile(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortFile !== SortType.Length,
          })}
          onClick={() => setSortFile(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning ', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isSelectionActive && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetFile}
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
