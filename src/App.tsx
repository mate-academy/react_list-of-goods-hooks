import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
];

enum SortType {
  DEFAULT = '',
  ALPHABETICAL = 'alphabetical',
  LENGTH = 'length',
}

function getPreparedGoods(
  goods: string[],
  {
    sortField,
    reverseOrder = false,
  }: { sortField: SortType; reverseOrder?: boolean },
) {
  const preparedGoods = [...goods];

  if (sortField === SortType.ALPHABETICAL) {
    preparedGoods.sort((goodA, goodB) => goodA.localeCompare(goodB));
  } else if (sortField === SortType.LENGTH) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (reverseOrder) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.DEFAULT);
  const [reverseOrder, setReverseOrder] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverseOrder,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': sortField !== SortType.ALPHABETICAL })}`}
          onClick={() => setSortField(SortType.ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': sortField !== SortType.LENGTH })}`}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': !reverseOrder })}`}
          onClick={() => setReverseOrder(!reverseOrder)}
        >
          Reverse
        </button>

        {(sortField !== SortType.DEFAULT || reverseOrder) && (
          <button
            type="button"
            className={`button is-warning is-light ${cn({ 'is-hidden': !reverseOrder && !sortField })}`}
            onClick={() => {
              setSortField(SortType.DEFAULT);
              setReverseOrder(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
