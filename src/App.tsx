import { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';

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

interface Good {
  name: string;
  id: number;
  length: number;
}

interface SortParams {
  sortField: keyof Good | null;
}

const goods: Good[] = goodsFromServer.map((el, i) => ({
  name: el,
  id: i,
  length: el.length,
}));

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(
  items: Good[],
  { sortField }: SortParams,
  reversed: boolean,
) {
  const preparedGoods = [...items];

  if (sortField) {
    preparedGoods.sort((item1, item2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return item1[sortField].localeCompare(item2[sortField]);

        case SORT_FIELD_LENGTH:
          return item1[sortField] - item2[sortField];

        default:
          return 0;
      }
    });
  }

  return reversed ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<keyof Good | null>(null);
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goods, { sortField }, reversed);

  const reset = () => {
    setSortField(null);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_FIELD_NAME })}
          onClick={() => setSortField(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': !reversed })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(reversed || sortField) && (
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
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good.id}>
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
