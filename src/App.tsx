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

enum SortType {
  Alphabet = 'string',
  Length = 'number',
  Default = '',
}
interface UpdateProps {
  goods: string[],
  sortBy: SortType,
  isReversed: boolean
}

function updateGoods({ goods, sortBy, isReversed }: UpdateProps): string[] {
  let preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.Default);
  const [isGoodsReversed, setIsGoodsReversed] = useState(false);
  const sortedGoods
    = updateGoods({
      goods: goodsFromServer,
      sortBy,
      isReversed: isGoodsReversed,
    });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortType.Alphabet,
          })}
          onClick={() => setSortBy(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SortType.Length,
          })}
          onClick={() => setSortBy(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isGoodsReversed,
          })}
          onClick={() => setIsGoodsReversed(!isGoodsReversed)}
        >
          Reverse
        </button>

        {(sortBy || isGoodsReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsGoodsReversed(false);
              setSortBy(SortType.Default);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
