import { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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

export enum SortType {
  None = 'NONE',
  Alphabetically = 'ALPHABETICALLY',
  ByLength = 'BY_LENGTH',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState(false);
  const [limit, setLimit] = useState<number>(goodsFromServer.length);

  const visibleGoods = useMemo(() => {
    let list = goodsFromServer.slice(0, limit);

    if (sortType === SortType.Alphabetically) {
      list = [...list].sort((a, b) => a.localeCompare(b));
    } else if (sortType === SortType.ByLength) {
      list = [...list].sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      list = [...list].reverse();
    }

    return list;
  }, [sortType, reversed, limit]);

  const isPristine =
    sortType === SortType.None && !reversed && limit === goodsFromServer.length;

  const reset = () => {
    setSortType(SortType.None);
    setReversed(false);
    setLimit(goodsFromServer.length);
  };

  return (
    <div className="section content">
      <h1>React list of goods (Hooks + TS)</h1>

      <div className="buttons">
        <button
          data-cy="SortAlphabetically"
          type="button"
          className={`button is-info ${
            sortType === SortType.Alphabetically ? '' : 'is-light'
          }`}
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          data-cy="SortByLength"
          type="button"
          className={`button is-success ${
            sortType === SortType.ByLength ? '' : 'is-light'
          }`}
          onClick={() => setSortType(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          data-cy="Reverse"
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>

        {!isPristine && (
          <button
            data-cy="Reset"
            type="button"
            className="button is-danger"
            onClick={reset}
          >
            Reset
          </button>
        )}

        <div className="select is-light">
          <select
            data-cy="Select"
            value={limit}
            onChange={e => setLimit(Number(e.target.value))}
          >
            {Array.from(
              { length: goodsFromServer.length },
              (_, i) => i + 1,
            ).map(n => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ul data-cy="Goods">
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
