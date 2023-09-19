import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';
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

enum SortType {
  alphabet = 'alphabet',
  length = 'length',
  none = '',
}

type ReorderOptions = {
  sortBy: SortType,
  isReversed: boolean,
};

function getPreparedGoods(
  goods: string[],
  { sortBy, isReversed }: ReorderOptions,
) {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.alphabet:
          return good1.localeCompare(good2);

        case SortType.length:
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
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.none);
  const [isReversed, setIsReversed] = useState(false);
  const visiableGoods = getPreparedGoods(goodsFromServer,
    { sortBy, isReversed });

  const sortAlphabetically = () => {
    setSortBy(SortType.alphabet);
  };

  const sortByLength = () => {
    setSortBy(SortType.length);
  };

  const reversedGoods = () => {
    setIsReversed(!isReversed);
  };

  const showResetButton = sortBy || isReversed;

  const resetButton = () => {
    setSortBy(SortType.none);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortAlphabetically}
          type="button"
          className={cn(
            'button is-info', {
              'is-light': sortBy !== SortType.alphabet,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={cn(
            'button is-success', {
              'is-light': sortBy !== SortType.length,
            },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={reversedGoods}
          type="button"
          className={cn(
            'button is-warning', {
              'is-light': !isReversed,
            },
          )}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            onClick={resetButton}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <GoodList goods={visiableGoods} />
    </div>
  );
};
