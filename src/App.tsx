import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

enum SortType {
  byAlphabet = 'byAlphabet',
  byLength = 'byLength',
}

function getPreparedGoods(
  goods: string[],
  { sortField, reversed }: { sortField: string; reversed: boolean },
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.byAlphabet:
          return good1.localeCompare(good2);
        case SortType.byLength:
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
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [reversed, setReversed] = useState<boolean>(false);
  const visibleGoods: string[] = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  function reset(): void {
    setSortField('');
    setReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.byAlphabet)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.byAlphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.byLength)}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.byLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reversed === false,
          })}
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
