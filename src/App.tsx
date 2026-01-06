import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

enum SortMode {
  abc = 'abc',
  length = 'length',
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

const getSortedGoods = (mode: SortMode | null): string[] => {
  const goodsList = [...goodsFromServer];

  if (mode === SortMode.abc) {
    goodsList.sort((a, b) => a.localeCompare(b));
  }

  if (mode === SortMode.length) {
    goodsList.sort((a, b) => a.length - b.length);
  }

  return goodsList;
};

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [mode, setModeState] = useState<SortMode | null>(null);

  const goodsList = getSortedGoods(mode);

  if (isReversed) {
    goodsList.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${mode === SortMode.abc ? '' : 'is-light'}`}
          onClick={() => {
            setModeState(SortMode.abc);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${mode === SortMode.length ? '' : 'is-light'}`}
          onClick={() => {
            setModeState(SortMode.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(mode !== null || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setModeState(null);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
