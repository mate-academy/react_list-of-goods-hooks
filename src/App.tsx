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
  Default = 'default',
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [currentSort, setCurrentSort] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const getPreparedGoods = (
    goods: string[],
    sortField: SortType,
    reversed: boolean,
  ): string[] => {
    const preparedGoods = [...goods];

    switch (sortField) {
      case SortType.Alphabet:
        preparedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.Length:
        preparedGoods.sort((a, b) => a.length - b.length);
        break;
      case SortType.Default:
      default:
        break;
    }

    if (reversed) {
      preparedGoods.reverse();
    }

    return preparedGoods;
  };

  const handleSort = (sortType: SortType) => {
    setCurrentSort(sortType);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setCurrentSort(SortType.Default);
    setIsReversed(false);
  };

  const goodsList = getPreparedGoods(goodsFromServer, currentSort, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': currentSort !== SortType.Alphabet,
          })}
          onClick={() => handleSort(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': currentSort !== SortType.Length,
          })}
          onClick={() => handleSort(SortType.Length)}
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

        {(currentSort !== SortType.Default || isReversed) && (
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
