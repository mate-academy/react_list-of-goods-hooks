import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

enum SortType {
  empty = '',
  alphabetically = 'Sort alphabetically',
  length = 'Sort by length',
}

function getPreparedGoods(
  goods: string[],
  sortFilter: SortType,
  isReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortFilter) {
    preparedGoods.sort((good1, good2) => {
      switch (sortFilter) {
        case SortType.alphabetically:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
}

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

export const App: React.FC = () => {
  const [sortFilter, setSortFilter] = useState<SortType>(SortType.empty);
  const [isReversed, setIsReversed] = useState(false);
  const preparedGoods = getPreparedGoods(
    goodsFromServer,
    sortFilter,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortFilter(SortType.alphabetically)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortFilter !== SortType.alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortFilter(SortType.length)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortFilter !== SortType.length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(!isReversed);
          }}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortFilter || isReversed) && (
          <button
            onClick={() => {
              setSortFilter(SortType.empty);
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
        {preparedGoods.map((good: string) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
