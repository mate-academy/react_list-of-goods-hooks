import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import {
  Good,
  ReverseParam,
  SortParam,
  SortType,
  SortingParams,
} from './types';

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

const LIGHT_COLOR_STYLE = 'is-light';

function preparedGoods(
  goods: Good[],
  { sortBy, order } : SortingParams,
) {
  const newGoods = [...goods];

  if (sortBy) {
    newGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.byLength:
          return good1.length - good2.length;

        case SortType.byName:
          return good1.localeCompare(good2);

        case SortType.reset:
        default:
          return 0;
      }
    });
  }

  if (order === SortType.reverse) {
    return newGoods.reverse();
  }

  return newGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortParam>('');
  const [sortOrder, setSortOrder] = useState<ReverseParam>('');
  const goodsForSort = preparedGoods(goodsFromServer, {
    sortBy: sortField, order: sortOrder,
  });

  const reverseGoods = () => {
    if (sortOrder === SortType.reverse) {
      setSortOrder('');
    } else {
      setSortOrder(SortType.reverse);
    }
  };

  const resetGoods = () => {
    setSortField(SortType.reset);
    setSortField('');
    setSortOrder('');
  };

  const Reset = () => (
    <button
      type="button"
      onClick={resetGoods}
      className="button is-danger is-light"
    >
      Reset
    </button>
  );

  const sortingButtonClass = (sortBy: string) => {
    if (sortField === sortBy) {
      return '';
    }

    return LIGHT_COLOR_STYLE;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.byName)}
          className={`button is-info ${sortingButtonClass(SortType.byName)}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.byLength)}
          className={`button is-success ${sortingButtonClass(SortType.byLength)}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverseGoods}
          className={`button is-warning ${sortOrder === SortType.reverse ? '' : LIGHT_COLOR_STYLE}`}
        >
          Reverse
        </button>

        {(sortField || sortOrder) && <Reset />}
      </div>

      <ul>
        {goodsForSort.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
