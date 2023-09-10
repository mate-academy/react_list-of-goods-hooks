import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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
  Name = 'name',
  Lenght = 'length',
  Default = '',
}

interface SortingOptions {
  sortType: SortType,
  isReversed: boolean,
}

function getPreparedGoods(
  goods: string[],
  {
    sortType,
    isReversed,
  }: SortingOptions,
): string[] {
  const preparedGoods = [...goods];

  if (sortType) {
    switch (sortType) {
      case SortType.Name:
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;

      case SortType.Lenght:
        preparedGoods
          .sort((good1, good2) => good1[sortType] - good2[sortType]);
        break;

      default:
        break;
    }
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods: string[] = getPreparedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  const resetSortingSettings = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  const isResetButtonVisible = sortType || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            {
              'is-light': sortType !== SortType.Name,
            },
          )}
          onClick={() => {
            setSortType(SortType.Name);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.Lenght,
          })}
          onClick={() => {
            setSortType(SortType.Lenght);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed((isPrevReversed) => !isPrevReversed)}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSortingSettings}
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
