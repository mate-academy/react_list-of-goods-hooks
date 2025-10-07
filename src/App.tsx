// import * as React from 'react';
import React, { useState } from 'react';
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

type Good = string;

enum SortType {
  None = 'NONE',
  Alphabetically = 'ALPHABETICALLY',
  ByLength = 'BY_LENGTH',
  Reverse = 'REVERSE',
}

export const App: React.FC = () => {
  const [sortGoods, setGoods] = useState<Good[]>([...goodsFromServer]);
  const [active, setActive] = useState<SortType>(SortType.None);

  const sortAlphabetically = () => {
    setGoods([...sortGoods].sort((a, b) => a.localeCompare(b)));
    setActive(SortType.Alphabetically);
  };

  const sortByLength = () => {
    setGoods([...sortGoods].sort((a, b) => a.length - b.length));
    setActive(SortType.ByLength);
  };

  const reverseGoods = () => {
    setGoods([...sortGoods].reverse());
    setActive(SortType.Reverse);
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
    setActive(SortType.None);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortAlphabetically}
          className={`button is-info ${active === SortType.Alphabetically ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={`button is-success ${active === SortType.ByLength ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverseGoods}
          className={`button is-warning ${active === SortType.Reverse ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        <button
          type="button"
          onClick={reset}
          className={`button is-danger ${active === SortType.None ? 'is-active' : 'is-light'}`}
        >
          Reset
        </button>
      </div>

      <ul>
        {sortGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
