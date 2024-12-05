import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import cn from 'classnames';
import { useState } from 'react';
import { Good } from './components/Good';
import { GoodType } from './types/GoodType';

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

const goodsWithIds: GoodType[] = goodsFromServer.map((good, index) => {
  return {
    name: good,
    id: index,
  };
});

enum SortType {
  Default = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

function getPreparedGoods(
  goods: GoodType[],
  { sortField, isReversed }: { sortField: SortType; isReversed: boolean },
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabet:
          return good1.name.localeCompare(good2.name);
        case SortType.Length:
          return good1.name.length - good2.name.length;
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
  const [sortField, setSortField] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsWithIds, {
    sortField,
    isReversed,
  });

  const isResetButtonVisible = sortField || isReversed;

  const handleReset = () => {
    setSortField(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
          onClick={() => {
            setSortField(SortType.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SortType.Length);
          }}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(prev => !prev)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <Good key={good.id} good={good} />
        ))}
      </ul>
    </div>
  );
};
