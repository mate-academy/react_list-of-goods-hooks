import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
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

enum SortType {
  ABC = 'Sort alphabeticaly',
  Length = 'Sort by length',
  Reset = 'reset',
}

interface SortField {
  sortField: string | '';
  isReverseOrder: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, isReverseOrder }: SortField,
) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SortType.ABC:
        return good1.localeCompare(good2);

      case SortType.Length:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  return !isReverseOrder ? preparedGoods : preparedGoods.reverse();
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverseOrder, setIsReverseOrder] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, isReverseOrder },
  );

  function toggleReverse() {
    setIsReverseOrder(!isReverseOrder);
  }

  function toggleReset() {
    setSortField('');
    setIsReverseOrder(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            'is-light': sortField !== SortType.ABC,
          }, 'button is-info')}
          onClick={() => setSortField(SortType.ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            'is-light': sortField !== SortType.Length,
          }, 'button is-success')}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            'is-light': !isReverseOrder,
          }, 'button is-warning')}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(sortField || isReverseOrder) && (
          <button
            type="button"
            className={cn({
              'is-light': sortField !== SortType.Reset,
            }, 'button is-danger')}
            onClick={toggleReset}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
