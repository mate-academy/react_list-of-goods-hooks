import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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

type SortFunction = ((a: string, b: string) => number) | null;

export const App = () => {
  const [sorting, setSorting] = useState<SortFunction>(null);
  const [reversed, setReversed] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<string>('');

  const sortedGoods = (): string[] => {
    const items = [...goodsFromServer];

    if (sorting) {
      items.sort(sorting);
    }

    if (reversed) {
      items.reverse();
    }

    return items;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeButton === 'alphabet' ? '' : 'is-light'}`}
          onClick={() => {
            setSorting(() => (a: string, b: string) => a.localeCompare(b));
            setActiveButton('alphabet');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeButton === 'length' ? '' : 'is-light'}`}
          onClick={() => {
            setSorting(() => (a:string, b:string) => a.length - b.length);
            setActiveButton('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => {
            setReversed(prev => !prev);
          }}
        >
          Reverse
        </button>

        {(sorting != null || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSorting(null);
              setReversed(false);
              setActiveButton('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods().map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
