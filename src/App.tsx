import React from 'react';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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

enum SortType {
  Default = '',
  Alphabetically = 'Sort alphabetically',
  ByLength = 'Sort by length',
}

interface FilterParams {
  sortField: SortType;
  reversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, reversed }: FilterParams,
) {
  const preparedGoods = [...goods];

  if (sortField !== SortType.Default) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return good1.localeCompare(good2);
        case SortType.ByLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabetically)}
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.Alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.ByLength)}
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SortType.ByLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={classNames('button is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            onClick={() => {
              setSortField(SortType.Default);
              setReversed(false);
            }}
            type="button"
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
