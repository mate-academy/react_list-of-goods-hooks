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
type PreparationCondition = {
  sortField: SortType;
  reversed: boolean;
};
enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
  Default = ' ',
}

function getPreparedGoods(
  goods: string[],
  { sortField, reversed }: PreparationCondition,
) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        case SortType.Default:
          return 0;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [reversed, setReversed] = useState(false);
  const [sortField, setSortField] = useState(SortType.Default);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabet)}
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
          type="button"
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.Length)}
          className={cn('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          type="button"
        >
          Sort by length
        </button>

        <button
          className={cn('button is-warning', { 'is-light': !reversed })}
          onClick={() => {
            setReversed(!reversed);
          }}
          type="button"
        >
          Reverse
        </button>

        {sortField !== SortType.Default || reversed ? (
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
        ) : null}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
