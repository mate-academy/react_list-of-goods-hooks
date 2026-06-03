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
  ALPHABET = 'Alphabet',
  LENGTH = 'Length',
}

export const App = () => {
  const visibleGoods = [...goodsFromServer];
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  if (sortField === SortType.ALPHABET) {
    visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortField === SortType.LENGTH) {
    visibleGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed === true) {
    visibleGoods.reverse();
  }

  const sortByAlphabet = () => {
    setSortField(SortType.ALPHABET);
  };

  const reset = () => {
    setSortField(SortType.NONE);
    setIsReversed(false);
  };

  const sortByLength = () => {
    setSortField(SortType.LENGTH);
  };

  const toggleReverse = () => setIsReversed(prev => !prev);
  const isOriginalOrder = sortField === SortType.NONE && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlphabet}
          type="button"
          className={`button is-info ${sortField === SortType.ALPHABET ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-success ${sortField === SortType.LENGTH ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={toggleReverse}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            onClick={reset}
            type="button"
            className={`button is-danger ${sortField === SortType.NONE ? '' : 'is-light'}`}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
