import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

import { SortType, SortingParams } from './Types/SortingParams';

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

const SORT_FIELD_NAME: SortType = SortType.Name;
const SORT_FIELD_LENGTH: SortType = SortType.Length;
let isResetVisible = false;

type Goods = string[];

function getPreparedGoods(
  goods: Goods,
  { sortField, isReversed }: SortingParams,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    isResetVisible = true;

    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    isResetVisible = true;
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [isReversed, setReversed] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, isReversed },
  );

  function setReverseButtonAction(reverse: boolean) {
    if (reverse) {
      isResetVisible = false;

      return setReversed(false);
    }

    return setReversed(true);
  }

  function resetSorting() {
    setSortField(SortType.None);
    setReversed(false);
    isResetVisible = false;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_NAME)}
          className={`button is-info ${classNames({ 'is-light': sortField !== SORT_FIELD_NAME })}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={`button is-success ${classNames({ 'is-light': sortField !== SORT_FIELD_LENGTH })}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverseButtonAction(isReversed)}
          className={`button is-warning ${classNames({ 'is-light': !isReversed })}`}
        >
          Reverse
        </button>

        {isResetVisible
        && (
          <button
            type="button"
            onClick={resetSorting}
            className="button is-danger is-light"
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
