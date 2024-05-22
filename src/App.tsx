import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './components/GoodList/GoodList';

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

enum SortBy {
  Alphabet = 'Alphabet',
  Length = 'Length',
}

function getPrepareGoods(
  goods: string[],
  { sortField }: { sortField: string },
): string[] {
  const visibleGoods = [...goods];

  if (sortField) {
    visibleGoods.sort((good1: string, good2: string) => {
      switch (sortField) {
        case SortBy.Alphabet:
          return good1.localeCompare(good2);

        case SortBy.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortField, setsortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPrepareGoods(goodsFromServer, { sortField });

  if (reverse) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            sortField !== SortBy.Alphabet ? 'is-light' : '',
          )}
          onClick={() => setsortField(SortBy.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            sortField !== SortBy.Length ? 'is-light' : '',
          )}
          onClick={() => setsortField(SortBy.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reverse })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverse(false);
              setsortField('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
