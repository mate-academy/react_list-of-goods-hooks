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
  None = 'none', // За замовчуванням, коли сортування не обрано
  Alphabetically = 'alphabetically',
  ByLength = 'byLength',
}

export const App: React.FC = () => {
  const [wayOfSorting, setSortField] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState<boolean>(false);

  let visibleGoods = [...goodsFromServer];

  if (wayOfSorting === SortType.Alphabetically) {
    visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (wayOfSorting === SortType.ByLength) {
    visibleGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  const reset = () => {
    setSortField(SortType.None);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${wayOfSorting === SortType.Alphabetically ? 'is-active' : 'is-light'}`}
          onClick={() => setSortField(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${wayOfSorting === SortType.ByLength ? 'is-active' : 'is-light'}`}
          onClick={() => setSortField(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? 'is-active' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {wayOfSorting === SortType.None && !reversed ? (
          <></>
        ) : (
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
