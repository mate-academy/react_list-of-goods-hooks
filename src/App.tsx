import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import {
  goodsFromServer,
  SortType,
  filteredGoods,
} from './utils/filteredGoods';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [reverseToggle, setReverseToggle] = useState(false);

  const reset = (): void => {
    setFilter('');
    setReverseToggle(false);
  };

  const goods = filteredGoods(goodsFromServer, filter, reverseToggle);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${filter !== SortType.SORT_ALPHABET && 'is-light'}`}
          onClick={() => setFilter(SortType.SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${filter !== SortType.SORT_LENGTH && 'is-light'}`}
          onClick={() => setFilter(SortType.SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reverseToggle && 'is-light'}`}
          onClick={() => setReverseToggle(!reverseToggle)}
        >
          Reverse
        </button>
        {filter || reverseToggle ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {goods.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
