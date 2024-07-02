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

export enum SortType {
  DEFAULT = 'DEFAULT',
  ALPHABETICAL = 'ALPHABETICAL',
  LENGTH = 'LENGTH',
  REVERSE = 'REVERSE',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case SortType.ALPHABETICAL:
        return good1.localeCompare(good2);
      case SortType.LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  const displayedGoods = isReversed ? [...sortedGoods].reverse() : sortedGoods;

  const handleSort = (field: SortType) => {
    setSortField(field);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortField(SortType.DEFAULT);
    setIsReversed(false);
  };

  const showResetButton = sortField !== SortType.DEFAULT || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.ALPHABETICAL,
          })}
          onClick={() => handleSort(SortType.ALPHABETICAL)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
          onClick={() => handleSort(SortType.LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>
        {showResetButton && (
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
        {displayedGoods.map((good, index) => (
          <li key={index} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
