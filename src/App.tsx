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
  Alphabetically = 'alphabetically',
  ByLength = 'byLength',
  Reverse = 'reverse',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | null>(null);
  const [reversed, setReversed] = useState(false);

  let visibleGoods = [...goodsFromServer];

  if (sortField === SortType.Alphabetically) {
    visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortField === SortType.ByLength) {
    visibleGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  const reset = () => {
    setSortField(null);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={() =>
            setSortField(
              sortField === SortType.Alphabetically
                ? null
                : SortType.Alphabetically,
            )
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.ByLength ? '' : 'is-light'}`}
          onClick={() =>
            setSortField(
              sortField === SortType.ByLength ? null : SortType.ByLength,
            )
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {sortField === null && reversed === false ? (
          <> </>
        ) : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
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
