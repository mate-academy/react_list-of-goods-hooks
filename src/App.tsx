import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

// type SotrType = 'alpha' | 'length' | null;

enum SortType {
  Alpha = 'alpha',
  Length = 'length',
  None = 'none',
}

const goodsFromServer = [
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

export const App = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const getProcessedProducts = () => {
    const result = [...goodsFromServer];

    if (sortType === SortType.Alpha) {
      result.sort((a, b) => a.localeCompare(b));
    }

    if (sortType === SortType.Length) {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  };

  const products = getProcessedProducts();

  const handleSortAlpha = () => {
    setSortType(SortType.Alpha);
  };

  const handleSortByLength = () => {
    setSortType(SortType.Length);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const resetProducts = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  const isResetVisible = sortType !== SortType.None || isReversed;

  const isActive = (type: SortType) => sortType === type;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isActive(SortType.Alpha) ? '' : 'is-light'}`}
          onClick={handleSortAlpha}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isActive(SortType.Length) ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetProducts}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {products.map(product => (
          <li key={product} data-cy="Good">
            {product}
          </li>
        ))}
      </ul>
    </div>
  );
};
