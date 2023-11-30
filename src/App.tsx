import React, { useState } from 'react';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer : string[] = [
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
  Name = 'alphabeticaly',
  Length = 'length',
}

interface FunctionArguments {
  sortField : string,
  reversed: boolean,
}

function prepareGoods(goods: string[],
  { sortField, reversed }: FunctionArguments): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Name:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.Default);
  const [reversed, setReversed] = useState(false);

  const reset = () => {
    setSortField(SortType.Default);
    setReversed(false);
  };

  const visibleGoods = prepareGoods(goodsFromServer, { sortField, reversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button', 'is-info',
              { 'is-light': sortField !== SortType.Name })
          }
          onClick={() => setSortField(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button', 'is-success',
              { 'is-light': sortField !== SortType.Length })
          }
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn('button', 'is-warning',
              { 'is-light': !reversed })
          }
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
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
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={uuidv4()}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
