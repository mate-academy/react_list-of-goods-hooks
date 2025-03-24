import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  Alph = 'alph',
  Length = 'length',
  None = '',
}

interface SortOptions {
  sortField: SortField;
  isReversed: boolean;
}

function sortGoods(goods: string[], { sortField, isReversed }: SortOptions) {
  const preparedGoods = [...goods];

  if (sortField !== SortField.None) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.Alph:
          return good1.localeCompare(good2);

        case SortField.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortField.None);
  const [isReversed, setIsReversed] = useState(false);
  const goods = sortGoods(goodsFromServer, { sortField, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortField.Alph)}
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SortField.Alph,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortField.Length)}
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SortField.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(isReversed || sortField !== SortField.None) && (
          <button
            onClick={() => {
              setSortField(SortField.None);
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
