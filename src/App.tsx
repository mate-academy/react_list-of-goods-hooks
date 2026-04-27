import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
  NONE = '',
  ALPHA = 'alpha',
  LENGTH = 'length',
}

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const getPreparedGoods = () => {
    const preparedGoods = [...goodsFromServer];

    if (sortField === SortType.ALPHA) {
      preparedGoods.sort((a, b) => a.localeCompare(b));
    }

    if (sortField === SortType.LENGTH) {
      preparedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      preparedGoods.reverse();
    }

    return preparedGoods;
  };

  const visibleGoods = getPreparedGoods();

  const sortByAlpha = () => {
    setSortField(SortType.ALPHA);
  };

  const sortByLength = () => {
    setSortField(SortType.LENGTH);
  };

  const reverseGoods = () => {
    setIsReversed(prev => !prev);
  };

  const reset = () => {
    setSortField(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === 'alpha' ? '' : 'is-light'}`}
          onClick={sortByAlpha}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(sortField !== '' || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
