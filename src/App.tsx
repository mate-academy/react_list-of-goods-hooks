import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

enum SortType {
  Default,
  Alphabetically,
  ByLength,
}

interface SortParams {
  sortType: SortType | null;
  isReversed: boolean;
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

const getPreparedGoods = (
  goods: string[],
  { sortType, isReversed }: SortParams,
) => {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.Alphabetically:
          return good1.localeCompare(good2);
        case SortType.ByLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  // const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sortType, setSortType] = useState<SortType | null>(null);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const visibleGood = getPreparedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  const showResetButton = sortType !== null || isReversed !== false;

  const reset = () => {
    setSortType(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.Alphabetically)}
          type="button"
          className={cn(
            {
              'is-light': sortType !== SortType.Alphabetically,
            },
            'button is-info',
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.ByLength)}
          type="button"
          className={cn(
            {
              'is-light': sortType !== SortType.ByLength,
            },
            'button is-success',
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(value => !value)}
          type="button"
          className={cn(
            {
              'is-light': !isReversed,
            },
            'button is-warning',
          )}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGood.map((item, index) => (
          <li key={index} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
