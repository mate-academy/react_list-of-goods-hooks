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

enum SortType {
  Alphabetically = 'Sort alphabetically',
  ByLength = 'Sort by length',
  Default = 'Default',
}

type SortField = {
  sortType: SortType;
  isReversed: boolean;
};

const SORT_FIELD_ALPHABETICALLY: SortField = {
  sortType: SortType.Alphabetically,
  isReversed: false,
};

const SORT_FIELD_BY_LENGTH: SortField = {
  sortType: SortType.ByLength,
  isReversed: false,
};

function getPreparedGoods(goods: string[], sortField: SortField) {
  const preparedGoods = [...goods];

  switch (sortField.sortType) {
    case SORT_FIELD_ALPHABETICALLY.sortType:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SORT_FIELD_BY_LENGTH.sortType:
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
  const [sortField, setSortField] = useState<SortField>({
    sortType: SortType.Default,
    isReversed: false,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() =>
            setSortField(prevState => ({
              sortType: SortType.Alphabetically,
              isReversed: prevState.isReversed,
            }))
          }
          className={cn('button', 'is-info', {
            'is-light': sortField.sortType !== SortType.Alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField.sortType !== SortType.ByLength,
          })}
          onClick={() =>
            setSortField(prevState => ({
              sortType: SortType.ByLength,
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

        {(sortField.sortType !== SortType.Default || sortField.isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() =>
              setSortField({ sortType: SortType.Default, isReversed: false })
            }
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
