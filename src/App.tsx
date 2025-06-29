import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  byAlphabet = 'Sort alphabetically',
  byLength = 'Sort by length',
}

type SortField = {
  sortField: string;
  isReverse: boolean;
};

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

function getPrepearedGoods(
  goods: string[],
  { sortField, isReverse }: SortField,
) {
  let prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods = prepearedGoods.sort((good1, good2) => {
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

  if (isReverse) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [reversed, setReversed] = useState(false);
  const sortedGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    isReverse: reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.byAlphabet,
          })}
          onClick={() => setSortField(SortType.byAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.byLength,
          })}
          onClick={() => setSortField(SortType.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reversed === false,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className={cn('button', 'is-danger', {
              'is-light': !sortField,
            })}
            onClick={() => {
              setSortField('');
              setReversed(false);
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
