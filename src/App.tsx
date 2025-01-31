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
  Name = 'name',
  Length = 'length',
  Undefined = '',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Undefined);
  const [reversed, setReversed] = useState<boolean>(false);

  let visbleGoods = [...goodsFromServer];

  if (sortField) {
    visbleGoods = visbleGoods.sort((good1: string, good2: string) => {
      switch (sortField) {
        case SortType.Name:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    visbleGoods = visbleGoods.reverse();
  }

  const reset = () => {
    setSortField(SortType.Undefined);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button ${sortField === SortType.Name ? 'is-info' : 'is-light'}`}
          onClick={() => setSortField(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button ${sortField === SortType.Length ? 'is-success' : 'is-light'}`}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${reversed ? 'is-warning' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField !== SortType.Undefined || reversed) && (
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
        {visbleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
