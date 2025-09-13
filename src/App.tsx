import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { Good } from './types/Good';
import { SortType } from './types/SortType';

export const goodsFromServer: Good[] = [
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
  const initialGoods: Good[] = [...goodsFromServer];

  const [goods, setGoods] = useState<Good[]>(initialGoods);
  const [sortField, setSortField] = useState<SortType | null>(null);
  const [isReversed, setIsReversed] = useState(false);

  const getSortedGoods = (field: SortType, reverse: boolean) => {
    const sorted = [...initialGoods];

    switch (field) {
      case SortType.Alphabet:
        sorted.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.Length:
        sorted.sort((a, b) => a.length - b.length);
        break;
      case SortType.Default:
        break;
    }

    if (reverse) {
      sorted.reverse();
    }

    return sorted;
  };

  const handleSort = (field: SortType) => {
    setSortField(field);
    const sortedGoods = getSortedGoods(field, isReversed);

    setGoods(sortedGoods);
  };

  const handleReverse = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setGoods(initialGoods);
    setSortField(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => handleSort(SortType.Alphabet)}
          className={`button is-info ${sortField === SortType.Alphabet ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => handleSort(SortType.Length)}
          className={`button is-success ${sortField === SortType.Length ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
