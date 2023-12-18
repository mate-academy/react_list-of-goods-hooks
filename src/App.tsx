import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

export const goodsFromServer: GoodsFromServer = [
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

type GoodsFromServer = string[];

enum SortType {
  ALPHABETICALLY = 'alphabetically',
  LENGTH = 'length',
}

interface SortOptions {
  sortField: SortType | '',
  reversedField: boolean,
}

function getPreparedGoods(
  goods: GoodsFromServer,
  { sortField, reversedField }: SortOptions,
): GoodsFromServer {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversedField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [reversedField, setReversedField] = useState<boolean>(false);
  const [sortField, setSortField] = useState<SortType | ''>('');
  const visibleGoods: GoodsFromServer = getPreparedGoods(goodsFromServer, {
    sortField,
    reversedField,
  });

  function reset() {
    setSortField('');
    setReversedField(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info
          ${classNames({ 'is-light': sortField !== SortType.ALPHABETICALLY })}`}
          onClick={() => setSortField(SortType.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success
          ${classNames({ 'is-light': sortField !== SortType.LENGTH })}`}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning
          ${classNames({ 'is-light': !reversedField })}`}
          onClick={() => setReversedField(!reversedField)}
        >
          Reverse
        </button>

        {(sortField || reversedField) && (
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
        {visibleGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
