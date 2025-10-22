import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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

export enum SortType {
  None = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

const getSortedGoods = (
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
): string[] => {
  const sortedGoods = [...goods];

  switch (sortType) {
    case SortType.Alphabet:
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.Length:
      sortedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  return isReversed ? sortedGoods.reverse() : sortedGoods;
};

export const App: React.FC = () => {
  const [activeSort, setActiveSort] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortedGoods = getSortedGoods(goodsFromServer, activeSort, isReversed);

  const applySort = (type: SortType) => {
    setActiveSort(type);
  };

  const toggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const resetGoods = () => {
    setActiveSort(SortType.None);
    setIsReversed(false);
  };

  const isModified = activeSort !== SortType.None || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': activeSort !== SortType.Alphabet,
          })}
          onClick={() => applySort(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': activeSort !== SortType.Length,
          })}
          onClick={() => applySort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
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
