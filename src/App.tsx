import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortType } from './types/SortTypes';

export const goodsFromServer: string[] = [
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
 const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleSortAlphabetically = (): void => {
    setSortType(SortType.Alphabet);
  };

  const handleSortByLength = (): void => {
    setSortType(SortType.Length);
  };

  const handleToggleReverse = (): void => {
    setIsReversed(prev => !prev);
  };

  const handleReset = (): void => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  const getProcessedGoods = (): string[] => {
    const list = [...goodsFromServer];

    if (sortType === SortType.Alphabet) {
      list.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SortType.Length) {
      list.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      list.reverse();
    }

    return list;
  };

  const processedGoods = getProcessedGoods();
  const isModified = sortType !== SortType.None || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button type="button" className={`button is-info ${
            sortType === SortType.Alphabet ? '' : 'is-light'
          }`}
          onClick={handleSortAlphabetically}>
          Sort alphabetically
        </button>

        <button type="button" className={`button is-success ${
            sortType === SortType.Length ? '' : 'is-light'
          }`}
          onClick={handleSortByLength}>
          Sort by length
        </button>

        <button type="button" className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleToggleReverse}>
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {processedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
