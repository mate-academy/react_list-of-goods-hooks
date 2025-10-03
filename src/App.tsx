import React, { useState } from 'react';
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
  ALPHABETICAL = 'Sort alphabetically',
  LENGTH = 'Sort by length',
  REVERSE = 'Reverse',
  RESET = 'Reset',
}

interface GoodListProps {
  goods: string[];
}

const GoodList: React.FC<GoodListProps> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li key={good} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [currentSort, setCurrentSort] = useState<SortType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const original = goodsFromServer;

  const sortAlphabetically = (items: string[]): string[] => {
    return [...items].sort((a, b) => a.localeCompare(b));
  };

  const sortByLength = (items: string[]): string[] => {
    return [...items].sort((a, b) => a.length - b.length);
  };

  const reverse = (items: string[]): string[] => {
    return [...items].reverse();
  };

  const handleSort = (type: SortType) => {
    setCurrentSort(type);
    let newGoods: string[];

    switch (type) {
      case SortType.ALPHABETICAL:
        newGoods = sortAlphabetically(original);
        break;
      case SortType.LENGTH:
        newGoods = sortByLength(original);
        break;
      case SortType.REVERSE:
        newGoods = reverse(original);
        break;
      case SortType.RESET:
        newGoods = [...original];
        break;
      default:
        newGoods = [...original];
        break;
    }

    setGoods(newGoods);
  };

  const displayedGoods = goods.filter(good =>
    good.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="section content">
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Search goods..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${currentSort !== SortType.ALPHABETICAL ? 'is-light' : ''}`}
          onClick={() => handleSort(SortType.ALPHABETICAL)}
          aria-pressed={currentSort === SortType.ALPHABETICAL}
        >
          {SortType.ALPHABETICAL}
        </button>

        <button
          type="button"
          className={`button is-success ${currentSort !== SortType.LENGTH ? 'is-light' : ''}`}
          onClick={() => handleSort(SortType.LENGTH)}
          aria-pressed={currentSort === SortType.LENGTH}
        >
          {SortType.LENGTH}
        </button>

        <button
          type="button"
          className={`button is-warning ${currentSort !== SortType.REVERSE ? 'is-light' : ''}`}
          onClick={() => handleSort(SortType.REVERSE)}
          aria-pressed={currentSort === SortType.REVERSE}
        >
          {SortType.REVERSE}
        </button>

        {currentSort !== null && (
          <button
            type="button"
            className={`button is-danger ${currentSort !== SortType.RESET ? 'is-light' : ''}`}
            onClick={() => handleSort(SortType.RESET)}
            aria-pressed={currentSort === SortType.RESET}
          >
            {SortType.RESET}
          </button>
        )}
      </div>

      <GoodList goods={displayedGoods} />
    </div>
  );
};
