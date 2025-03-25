import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

enum SortType {
  Default = '',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

const goodsFromServer: string[] = [
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

type SortOptions = {
  sortField: SortType;
  isReversed: boolean;
};

function getPreparedGoods(goods: string[], { sortField, isReversed }: SortOptions): string[] {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      if (sortField === SortType.Alphabetically) {
        return a.localeCompare(b);
      }
      if (sortField === SortType.Length) {
        return a.length - b.length;
      }
      return 0;
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, { sortField, isReversed });

  const handleReverseToggle = () => setIsReversed(prev => !prev);
  const resetGoods = () => {
    setSortField(SortType.Default);
    setIsReversed(false);
  };

  const isSorted = sortField !== SortType.Default || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.Alphabetically ? 'is-primary' : 'is-light'}`}
          onClick={() => setSortField(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortField === SortType.Length ? 'is-primary' : 'is-light'}`}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${isReversed ? 'is-primary' : 'is-light'}`}
          onClick={handleReverseToggle}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
