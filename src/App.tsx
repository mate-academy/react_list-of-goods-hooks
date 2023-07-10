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
  ALPHABET = 'alphabetically',
  LENGTH = 'length',
  NONE = '',
}

interface SortParams {
  sortType: SortType,
  isReversed: boolean,
}

function getSortedGoods(
  goods: string[],
  { sortType, isReversed }: SortParams,
) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);
        case SortType.LENGTH:
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
  const [isReversed, setIsReverse] = useState(false);
  const [sortType, setSortField] = useState(SortType.NONE);
  const visibleGoods = getSortedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });
  const isShowResetButton = sortType || isReversed;
  const onReset = () => {
    setSortField(SortType.NONE);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SortType.ALPHABET);
          }}
          type="button"
          className={cn('button is-info',
            sortType !== SortType.ALPHABET && 'is-light')}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SortType.LENGTH);
          }}
          type="button"
          className={cn('button is-success',
            sortType !== SortType.LENGTH && 'is-light')}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReverse(!isReversed);
          }}
          type="button"
          className={cn('button is-warning',
            !isReversed && 'is-light')}
        >
          Reverse
        </button>
        {isShowResetButton && (
          <button
            onClick={onReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
