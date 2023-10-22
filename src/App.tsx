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
  'Garlic',
];

enum SortField {
  SORT_FIELD_ALPH = 'alph',
  SORT_FIELD_LENTGTH = 'length',
  DEFAULT = '',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortField,
  reverse: boolean,
) {
  let preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SortField.SORT_FIELD_ALPH:
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;

      case SortField.SORT_FIELD_LENTGTH:
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
        break;

      default:
        preparedGoods = [...preparedGoods];
    }
  }

  if (reverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>(SortField.DEFAULT);
  const [IsReversed, setIsReversed] = useState(false);
  const sortedGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    IsReversed,
  );
  const resetReverse = IsReversed || sortField !== SortField.DEFAULT;

  function handleReset() {
    setSortField(SortField.DEFAULT);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SortField.SORT_FIELD_ALPH },
          )}
          onClick={() => setSortField(SortField.SORT_FIELD_ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SortField.SORT_FIELD_LENTGTH },
          )}
          onClick={() => setSortField(SortField.SORT_FIELD_LENTGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !IsReversed },
          )}
          onClick={() => {
            setIsReversed(current => !current);
          }}
        >
          Reverse
        </button>

        {resetReverse
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                handleReset();
              }}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
