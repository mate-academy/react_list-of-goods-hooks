import 'bulma/css/bulma.css';
import './App.scss';
import { useMemo, useState } from 'react';
import {
  Good,
  ReverseParam,
  SortParam,
  SortType,
  SortingParams,
} from './types';
import { Reset } from './components/Reset';

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
): Good[] {
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

  const goodsForSort = useMemo(
    () => (
      preparedGoods(goodsFromServer, { sortBy: sortField, order: sortOrder })
    ),
    [goodsFromServer, { sortField, sortOrder }],
  );

  const reverseGoods = () => {
    if (sortOrder === SortType.reverse) {
      setSortOrder('');
    } else {
      setSortOrder(SortType.reverse);
    }
  };

  const resetGoods = () => {
    setSortField(SortType.reset);
    setSortOrder('');
  };

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

        {
          (
            sortField === SortType.byName
            || sortField === SortType.byLength
            || sortOrder
          ) && <Reset resetGoods={resetGoods} />
        }
      </div>

      <ul>
        {goodsForSort.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
