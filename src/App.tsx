import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

enum SortType {
  None = '',
  Alphabet = 'abc',
  Length = 'length',
}

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

export const App = () => {
  const [sortBy, setSortBy] = useState(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const toggleReverse = () => {
    setIsReversed(!isReversed);
  };

  const sortByAlphabet = () => setSortBy(SortType.Alphabet);
  const sortByLength = () => setSortBy(SortType.Length);

  const reset = () => {
    setSortBy(SortType.None);
    setIsReversed(false);
  };

  const visibleGoods = [...goodsFromServer];

  if (sortBy === SortType.Alphabet) {
    visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortBy === SortType.Length) {
    visibleGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  const isChanged = sortBy !== SortType.None || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlphabet}
          type="button"
          className={`button is-info ${sortBy === SortType.Alphabet ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-success ${sortBy === SortType.Length ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={toggleReverse}
          type="button"
          className={`button is-warning ${isReversed === true ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
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