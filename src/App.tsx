import React, { useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export enum SortType {
  NONE = 'NONE',
  ALPHABETIC = 'ALPHABETIC',
  LENGTH = 'LENGTH',
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

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = useMemo(() => {
    let result = [...goodsFromServer];

    if (sortType === SortType.ALPHABETIC) {
      result.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SortType.LENGTH) {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  }, [sortType, isReversed]);

  const sortGoods = (type: SortType) => {
    if (type === SortType.NONE) {
      setSortType(SortType.NONE);
      setIsReversed(false);
      return;
    }
    setSortType(type);
  };

  const toggleReverse = () => {
    setIsReversed(!isReversed);
  };

  const needsReset = sortType !== SortType.NONE || isReversed;

  const getButtonClass = (buttonType: SortType) => {
    const baseClasses = 'button';
    const isActive = sortType === buttonType;

    switch (buttonType) {
      case SortType.ALPHABETIC:
        return `${baseClasses} is-info${isActive ? '' : ' is-light'}`;
      case SortType.LENGTH:
        return `${baseClasses} is-success${isActive ? '' : ' is-light'}`;
      default:
        return `${baseClasses} is-light`;
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={getButtonClass(SortType.ALPHABETIC)}
          onClick={() => sortGoods(SortType.ALPHABETIC)}
          data-cy="sortAlphabetically"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getButtonClass(SortType.LENGTH)}
          onClick={() => sortGoods(SortType.LENGTH)}
          data-cy="sortByLength"
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning${isReversed ? '' : ' is-light'}`}
          onClick={toggleReverse}
          data-cy="sortReverse"
        >
          Reverse
        </button>

        {needsReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => sortGoods(SortType.NONE)}
            data-cy="resetButton"
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
