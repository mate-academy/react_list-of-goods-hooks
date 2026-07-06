import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  None = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

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

export const App = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = [...goodsFromServer];

  if (sortType === SortType.Alphabet) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.Length) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.Alphabet ? '' : 'is-light'
          }`}
          onClick={() => setSortType(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === SortType.Length ? '' : 'is-light'
          }`}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.None);
              setIsReversed(false);
            }}
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
