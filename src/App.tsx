import 'bulma/css/bulma.css';
import { useState } from 'react';
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

enum SortTypes {
  NONE = 'none',
  ALPHABETICAL = 'alphabetical',
  LENGTH = 'length',
}

function getPreparedGoods(goods: string[], sortField: SortTypes) {
  const preparedGoods = [...goods];

  preparedGoods.sort((a, b) => {
    switch (sortField) {
      case SortTypes.ALPHABETICAL:
        return a.localeCompare(b);

      case SortTypes.LENGTH:
        return a.length - b.length;

      default:
        return 0;
    }
  });

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortTypes>(SortTypes.NONE);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField);
  const [order, setOrder] = useState<boolean>(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortTypes.ALPHABETICAL,
          })}
          onClick={() => setSortField(SortTypes.ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortTypes.LENGTH,
          })}
          onClick={() => setSortField(SortTypes.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !order,
          })}
          onClick={() => setOrder(!order)}
        >
          Reverse
        </button>

        {(sortField !== SortTypes.NONE || order !== false) && (
          <button
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
            onClick={() => {
              setSortField(SortTypes.NONE);
              setOrder(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {order
          ? visibleGoods
              .slice()
              .reverse()
              .map(good => (
                <li key={good} data-cy="Good">
                  {good}
                </li>
              ))
          : visibleGoods.map(good => (
              <li key={good} data-cy="Good">
                {good}
              </li>
            ))}
      </ul>
    </div>
  );
};
