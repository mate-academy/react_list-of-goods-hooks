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

const SORT_ALPHABETICALLY = 'alphabetically';
const SORT_BY_LENGTH = 'length';

type SortOptions = {
  sortBy: string;
  reversed: boolean;
};
function prepareGoods(goods: string[], { sortBy, reversed }: SortOptions) {
  let preparedGoods: string[] = [...goods];

  if (sortBy) {
    switch (sortBy) {
      case SORT_ALPHABETICALLY:
        preparedGoods = preparedGoods.sort((a: string, b: string) => {
          return a.localeCompare(b);
        });
        break;
      case SORT_BY_LENGTH:
        preparedGoods = preparedGoods.sort((a: string, b: string) => {
          return a.length - b.length;
        });
        break;
      default:
        break;
    }
  }

  if (reversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [reversed, setReversed] = useState(false);
  const goods: string[] = prepareGoods(goodsFromServer, { sortBy, reversed });
  const resetSorting = () => {
    setSortBy('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy !== SORT_ALPHABETICALLY ? 'is-light' : ''}`}
          onClick={() => setSortBy(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy !== SORT_BY_LENGTH ? 'is-light' : ''}`}
          onClick={() => setSortBy(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortBy || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSorting}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good: string) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
