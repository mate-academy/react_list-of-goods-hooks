import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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
  DEFAULT,
  ALPHABETICAL,
  LENGTH,
}

type SortParams = {
  sortType: SortType;
  isReversed: boolean;
};

const getSortedGoods = (
  items: string[],
  { sortType, isReversed }: SortParams,
) => {
  const sortedList = [...items];

  switch (sortType) {
    case SortType.ALPHABETICAL:
      sortedList.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      sortedList.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  return isReversed ? sortedList.reverse() : sortedList;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const resetSortStyle = () => {
    setSortType(SortType.DEFAULT);
    setIsReversed(false);
  };

  const sortedGoods = getSortedGoods(goodsFromServer, { sortType, isReversed });

  const showResetButton = sortType !== SortType.DEFAULT || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.ALPHABETICAL,
          })}
          onClick={() => setSortType(SortType.ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(current => !current)}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSortStyle}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
