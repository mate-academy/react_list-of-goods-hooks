import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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
  byAlphabetical = 'byAlphabetical',
  byLength = 'byLength',
  none = 'none',
}

const getSortedList = (method: SortType) => {
  const preparedGoods = [...goodsFromServer];

  switch (method) {
    case SortType.byAlphabetical:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SortType.byLength:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortMethod, setSortMethod] = useState(SortType.none);
  const [isReversed, setIsReversed] = useState(false);
  const sortedList = getSortedList(sortMethod);

  const handleSort = (method: SortType) => {
    switch (method) {
      case SortType.byAlphabetical:
        setSortMethod(method);
        break;

      case SortType.byLength:
        setSortMethod(method);
        break;

      default:
        setSortMethod(SortType.none);
        break;
    }
  };

  const handleReverse = () => {
    const preparedGoods = [...sortedList];

    preparedGoods.reverse();
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setIsReversed(false);
    setSortMethod(SortType.none);
  };

  if (isReversed) {
    sortedList.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSort(SortType.byAlphabetical)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortMethod !== SortType.byAlphabetical,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSort(SortType.byLength)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortMethod !== SortType.byLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {sortMethod !== SortType.none || isReversed ? (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {sortedList.map(good => (<li data-cy="Good">{good}</li>))}
      </ul>

    </div>
  );
};
