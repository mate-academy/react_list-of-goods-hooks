import React, { useState } from 'react';
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

enum SortField {
  Default = '',
  Abc = 'ABC',
  Length = 'LENGTH',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortField,
  reverseOrder: boolean,
) {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SortField.Abc:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortField.Length:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reverseOrder) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>(SortField.Default);
  const [reverseOrder, setReverseOrder] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    reverseOrder,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortField.Abc)}
          className={`button is-info ${cn({ 'is-light': sortField !== SortField.Abc })}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortField.Length)}
          className={`button is-success ${cn({ 'is-light': sortField !== SortField.Length })}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverseOrder(!reverseOrder)}
          className={`button is-warning ${cn({ 'is-light': !reverseOrder })}`}
        >
          Reverse
        </button>
        {(sortField !== SortField.Default || reverseOrder) && (
          <button
            type="button"
            onClick={() => {
              setSortField(SortField.Default);
              setReverseOrder(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
