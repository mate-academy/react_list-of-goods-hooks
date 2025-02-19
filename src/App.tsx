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

enum SortType {
  byLength = 'length',
  byAlphabet = 'alphabet',
  default = '',
}

interface FilterValue {
  sortField: SortType;
  reversed: boolean;
}

function getPreparedGoods<T extends string>(
  good: T[],
  { sortField, reversed }: FilterValue,
): T[] {
  const preparedGoods = [...good];

  if (sortField) {
    preparedGoods.sort((goodA, goodB) => {
      switch (sortField) {
        case SortType.byLength:
          return goodA.length - goodB.length;
        case SortType.byAlphabet:
          return goodA.localeCompare(goodB);
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
  const [sortField, setSortField] = useState<SortType>(SortType.default);
  const [reversed, setReversed] = useState(false);
  const goods = getPreparedGoods(goodsFromServer, { sortField, reversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.byAlphabet)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.byAlphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.byLength)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.byLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {(reversed || sortField) && (
          <button
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
            onClick={() => {
              setSortField(SortType.default);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
