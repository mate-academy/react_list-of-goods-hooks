import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export enum SortType {
  Alphabetically = 'ALPHABETICALLY',
  ByLength = 'BY_LENGTH',
  Reverse = 'REVERSE',
  Default = 'DEFAULT',
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

export function App(): React.ReactNode {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const [sortType, setSortType] = useState<SortType | null>(null);

  useEffect(() => {
    const sortedGoods = [...goodsFromServer];

    if (sortType === SortType.Alphabetically) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SortType.ByLength) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
  }, [sortType, isReversed]);

  useEffect(() => {
    setGoods([...goodsFromServer]);
  }, []);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.ByLength ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortType !== null || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortType(null);
              setIsReversed(false);
              setGoods([...goodsFromServer]);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
}
