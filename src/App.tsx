import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  name = 'name',
  length = 'length',
}

const getVisibleGoods = (
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
): string[] => {
  if (!sortField) {
    return goods;
  }

  const sortedGoods = [...goods].sort((good1, good2) => {
    switch (sortField) {
      case SortType.name:
        return good1.localeCompare(good2);
      case SortType.length:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [isReversed, setIsReversed] = useState(false);
  const [visibleGoods, setVisibleGoods] = useState<string[]>(goodsFromServer);

  const sortAlphabetically = () => {
    setSortField(SortType.name);
  };

  const sortByLength = () => {
    setSortField(SortType.length);
  };

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setIsReversed(false);
    setSortField('');
  };

  const reverseList = () => {
    setIsReversed(!isReversed);
  };

  const sortedVisibleGoods = getVisibleGoods(
    visibleGoods,
    sortField,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.name,
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': !isReversed,
          })}
          onClick={reverseList}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={reset}
        >
          Reset
        </button>
      </div>

      <ul>
        {sortedVisibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
