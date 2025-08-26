import { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

// Use the repo's initial data (10 items)
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
  const [reversed, setReversed] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(goodsFromServer.length);

  const visibleGoods = useMemo(() => {
    let list = goodsFromServer.slice(0, limit);

    switch (sortType) {
      case SortType.Alphabetically:
        list = [...list].sort((a, b) => a.localeCompare(b));
        break;

      case SortType.ByLength:
        list = [...list].sort((a, b) => a.length - b.length);
        break;

      case SortType.None:
      default:
        // keep initial order
        break;
    }

    if (reversed) {
      list = [...list].reverse();
    }

    return list;
  }, [sortType, reversed, limit]);

  // show Reset only if state differs from defaults
  const isPristine =
    sortType === SortType.None && !reversed && limit === goodsFromServer.length;

  const reset = (): void => {
    setSortType(SortType.None);
    setReversed(false);
    setLimit(goodsFromServer.length);
  };

  // helper to build Bulma button classes where the "active" state = no `is-light`
  const btnClass = (base: string, active: boolean): string =>
    `button ${base}${active ? '' : ' is-light'}`;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          data-cy="SortAlphabetically"
          type="button"
          className={btnClass('is-info', sortType === SortType.Alphabetically)}
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          data-cy="SortByLength"
          type="button"
          className={btnClass('is-success', sortType === SortType.ByLength)}
          onClick={() => setSortType(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          data-cy="Reverse"
          type="button"
          className={btnClass('is-warning', reversed)}
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>

        {!isPristine && (
          <button
            data-cy="Reset"
            type="button"
            className={btnClass('is-danger', true)} // Reset is "active" only when visible
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
