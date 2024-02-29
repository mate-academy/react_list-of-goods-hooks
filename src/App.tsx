import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './GoodList/GoodList';

enum SortField {
  name = 'name',
  length = 'length',
}

function getPreparedGoods(
  goods: string[],
  sortField: string,
  isAscending: boolean,
) {
  let preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SortField.name:
        preparedGoods = preparedGoods.sort((good1, good2) =>
          good1.localeCompare(good2),
        );
        break;

      case SortField.length:
        preparedGoods = preparedGoods.sort(
          (good1, good2) => good1.length - good2.length,
        );
        break;

      default:
        break;
    }
  }

  if (!isAscending) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

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
  const [sortField, setSortField] = useState('');
  const [isAsce, setIsAscending] = useState(true);

  const toggleSortOrder = () => {
    setIsAscending(!isAsce);
  };

  function reset() {
    setSortField('');
    setIsAscending(true);
  }

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isAsce);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortField.name)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortField.name,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortField.length)}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortField.length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': isAsce,
          })}
          onClick={toggleSortOrder}
        >
          Reverse
        </button>

        {(sortField !== '' || !isAsce) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
