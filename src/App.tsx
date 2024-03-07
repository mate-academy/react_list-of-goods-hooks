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
  SortAlphabet = 'alphabet',
  SortLength = 'length',
  Default = '',
}

interface FilterParams {
  isReversed: boolean;
  sortField: SortType;
}

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: FilterParams,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SortAlphabet:
          return good1.localeCompare(good2);
        case SortType.SortLength:
          return good1[sortField] - good2[sortField];
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

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const handleResetButtonClick = () => {
    setSortField(SortType.Default);
    setIsReversed(false);
  };

  const isResetButtonVisible = sortField || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SortAlphabet,
          })}
          onClick={() => setSortField(SortType.SortAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SortLength,
          })}
          onClick={() => setSortField(SortType.SortLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>
        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetButtonClick}
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
