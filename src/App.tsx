import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import SortType from './types/SortType';
import { getReorderedGoods } from './functions/getReorderedGoods';

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

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);

  const setDefault = () => {
    setSortType(SortType.NONE);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setReverse(!isReversed)}
        >
          Reverse
        </button>

        {
          (isReversed || sortType !== SortType.NONE)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={setDefault}
            >
              Reset
            </button>
          )
        }

      </div>

      <ul>
        <ul>
          {
            getReorderedGoods(goodsFromServer, { sortType, isReversed })
              .map((good) => (
                <li key={good} data-cy="Good">{good}</li>
              ))
          }
        </ul>
      </ul>
    </div>
  );
};
