import React, { useState, useEffect } from 'react';
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
  None = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortMode, setSortMode] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [goodsList, setGoodsList] = useState<string[]>(goodsFromServer);

  const getSortedGoods = (mode: SortType, reversed: boolean): string[] => {
    const sortedGoods = [...goodsFromServer];

    if (mode === SortType.Alphabet) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (mode === SortType.Length) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  useEffect(() => {
    if (sortMode === SortType.None && !isReversed) {
      setGoodsList(goodsFromServer);
    } else {
      const updatedList = getSortedGoods(sortMode, isReversed);

      setGoodsList(updatedList);
    }
  }, [sortMode, isReversed]);

  const handleSortAlphabetically = () => setSortMode(SortType.Alphabet);
  const handleSortByLength = () => setSortMode(SortType.Length);
  const handleReverse = () => setIsReversed(prev => !prev);
  const handleReset = () => {
    setSortMode(SortType.None);
    setIsReversed(false);
  };

  const getButtonClass = (mode: SortType | 'reverse'): string => {
    let colorClass = '';

    if (mode === SortType.Alphabet) {
      colorClass = 'is-info';
    } else if (mode === SortType.Length) {
      colorClass = 'is-success';
    } else if (mode === 'reverse') {
      colorClass = 'is-warning';
    }

    const isActive =
      (mode === 'reverse' && isReversed) ||
      (mode !== 'reverse' && mode === sortMode);

    return `button ${colorClass} ${isActive ? '' : 'is-light'}`;
  };

  const isResetVisible = (): boolean => {
    return sortMode !== SortType.None || isReversed;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={getButtonClass(SortType.Alphabet)}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getButtonClass(SortType.Length)}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={getButtonClass('reverse')}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResetVisible() && (
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
        {goodsList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
