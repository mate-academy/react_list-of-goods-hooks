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
  none = '',
  alphabetical = 'alphabetical',
  length = 'length',
}

const getVisibleGoods = (
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
) => {
  const sortedGoods = [...goods];

  if (sortField === SortType.alphabetical) {
    sortedGoods.sort();
  } else if (sortField === SortType.length) {
    sortedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.none);
  const [isReversed, setIsReversed] = useState(false);

  const reset = () => {
    setSortField(SortType.none);
    setIsReversed(false);
  };

  const reverseGoods = () => {
    setIsReversed(!isReversed);
  };

  const sortAlphabetically = () => {
    setSortField(SortType.alphabetical);
  };

  const sortByLength = () => {
    setSortField(SortType.length);
  };

  const visibleGoods = getVisibleGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortAlphabetically}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.alphabetical,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverseGoods}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
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
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
