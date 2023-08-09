import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { reverseGoods } from './functions/reverseGoods';
import { sortGoods } from './functions/sortGoods';
import KindsOfSort from './constances';

import { ISortGoods } from './interfaces/ISortGoods';

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
  const [sortBy, setSortBy] = useState<KindsOfSort>(KindsOfSort.NO_SORT);
  const [reversed, setReversed] = useState(false);
  const [goods, setGoods] = useState([...goodsFromServer]);

  const argsForSortGoods = (typeOfSorting: KindsOfSort): ISortGoods => ({
    sortBy: typeOfSorting,
    setSortBy,
    setReversed,
    setGoods,
    originalGoods: [...goodsFromServer],
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy !== KindsOfSort.ALPHABET && 'is-light'}`}
          onClick={() => {
            sortGoods(argsForSortGoods(KindsOfSort.ALPHABET));
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy !== KindsOfSort.LENGTH && 'is-light'}`}
          onClick={() => {
            sortGoods(argsForSortGoods(KindsOfSort.LENGTH));
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed !== true && 'is-light'}`}
          onClick={() => {
            reverseGoods({
              goods, reversed, setReversed, setGoods,
            });
          }}
        >
          Reverse
        </button>

        {(sortBy !== KindsOfSort.NO_SORT || reversed === true) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              sortGoods(argsForSortGoods(KindsOfSort.NO_SORT));
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => <li key={good} data-cy="Good">{good}</li>)}
      </ul>
    </div>
  );
};
