import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings', 'Carrot', 'Eggs', 'Ice cream', 'Apple',
  'Bread', 'Fish', 'Honey', 'Jam', 'Garlic',
];

export enum SortOptions {
  ALPHABETICAL = 'alphabetical',
  LENGTH = 'length',
}

type SortType = (typeof SortOptions)[keyof typeof SortOptions];

export const App: React.FC = () => {
  const [activeSort, setActiveSort] = useState<SortOptions | null>(null);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const getVisibleList = () => {
    const listCopy = [...goodsFromServer];

    switch (activeSort) {
      case SortOptions.ALPHABETICAL:
        listCopy.sort((a, b) => a.localeCompare(b));
        break;
      case SortOptions.LENGTH:
        listCopy.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }

    if (isReversed) {
      listCopy.reverse();
    }

    return listCopy;
  };

  const visibleList = getVisibleList();

  const handleSort = (type: SortType) => {
    setActiveSort(type);
  };

  const handleReverse = () => {
    setIsReversed(current => !current);
  };

  const handleReset = () => {
    setActiveSort(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': activeSort !== SortOptions.ALPHABETICAL,
          })}
          onClick={() => handleSort(SortOptions.ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': activeSort !== SortOptions.LENGTH,
          })}
          onClick={() => handleSort(SortOptions.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(activeSort || isReversed) && (
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
        {visibleList.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
