import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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
  DEFAULT = '',
  ALPHABETIC = 'alphabetically',
  LENGTH = 'length',
}

interface SortParams {
  sortField: SortField;
  reversedField: boolean;
}

function getPrepareGoods(
  goods: string[],
  { sortField, reversedField }: SortParams,
) {
  const prepareGoods = [...goods];

  switch (sortField) {
    case SortField.ALPHABETIC:
      prepareGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SortField.LENGTH:
      prepareGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  if (reversedField) {
    prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>(SortField.DEFAULT);
  const [reversedField, setReversedField] = useState<boolean>(false);
  const visibleGoods = getPrepareGoods(goodsFromServer, {
    sortField,
    reversedField,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortField.ALPHABETIC,
          })}
          onClick={() => setSortField(SortField.ALPHABETIC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortField.LENGTH,
          })}
          onClick={() => setSortField(SortField.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', {
            'is-warning': reversedField,
            'is-light': !reversedField,
          })}
          onClick={() => setReversedField(props => !props)}
        >
          Reverse
        </button>
        {(sortField || reversedField) && (
          <button
            onClick={() => {
              setSortField(SortField.DEFAULT);
              setReversedField(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      {visibleGoods.map(good => (
        <li key={good} data-cy="Good">
          {good}
        </li>
      ))}
    </div>
  );
};
