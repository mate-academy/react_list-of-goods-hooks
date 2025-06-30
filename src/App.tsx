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

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [activeSort, setActiveSort] = useState<string | null>(null);
  const [isReversed, setIsReversed] = useState(false);

  const sortAlphabetically = () => {
    let sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    if (isReversed) {
      sorted = sorted.reverse();
    }

    setGoods(sorted);
    setActiveSort('alphabet');
  };

  const sortByLength = () => {
    let sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

    if (isReversed) {
      sorted = sorted.reverse();
    }

    setGoods(sorted);
    setActiveSort('length');
  };

  const reverse = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
    setActiveSort(null);
    setIsReversed(false);
  };

  const isModified = (): boolean => {
    return goods.join('') !== goodsFromServer.join('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeSort === 'alphabet' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeSort === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {isModified() && (
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
        {goods.map((good: string) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
