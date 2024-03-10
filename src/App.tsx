import React, { useState } from 'react';
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

type SortField = {
  sortType: string;
  isReversed: boolean;
};

const SORT_FIELD_ALPHABETICALLY = 'Sort alphabetically';
const SORT_FIELD_BY_LENGTH = 'Sort by length';

function getPreparedGoods(goods: string[], sortField: SortField) {
  const preparedGoods = [...goods];

  switch (sortField.sortType) {
    case SORT_FIELD_ALPHABETICALLY:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SORT_FIELD_BY_LENGTH:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  if (sortField.isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState({
    sortType: '',
    isReversed: false,
  });

  const shouldDisplayResetButton = sortField.isReversed || sortField.sortType;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() =>
            setSortField(prevState => ({
              sortType: SORT_FIELD_ALPHABETICALLY,
              isReversed: prevState.isReversed,
            }))
          }
          className={cn('button', 'is-info', {
            'is-light': sortField.sortType !== SORT_FIELD_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField.sortType !== SORT_FIELD_BY_LENGTH,
          })}
          onClick={() =>
            setSortField(prevState => ({
              sortType: SORT_FIELD_BY_LENGTH,
              isReversed: prevState.isReversed,
            }))
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !sortField.isReversed,
          })}
          onClick={() =>
            setSortField(prevState => ({
              ...prevState,
              isReversed: !prevState.isReversed,
            }))
          }
        >
          Reverse
        </button>

        {shouldDisplayResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortField({ sortType: '', isReversed: false })}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getPreparedGoods(goodsFromServer, sortField).map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
