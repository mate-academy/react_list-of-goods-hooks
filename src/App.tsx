import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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

enum SortBy {
  Name = 'name',
  Length = 'length',
}

type PrepareList = (
  list: string[],
  sortType: SortType,
  isReverse: boolean
) => string[];

type SortType = SortBy | '';

const prepareList:PrepareList = (list, sortType, isReversed) => {
  const sortedList = [...list];

  switch (sortType) {
    case SortBy.Name:
      sortedList.sort((a, b) => a.localeCompare(b));
      break;
    case SortBy.Length:
      sortedList.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    sortedList.reverse();
  }

  return sortedList;
};

export const App = () => {
  const [sortType, setSortType] = useState<SortType>('');
  const [isReversed, setIsReversed] = useState(false);

  const preparedList = prepareList(goodsFromServer, sortType, isReversed);

  const handleReset = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortType !== SortBy.Name },
          )}
          onClick={() => setSortType(SortBy.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortType !== SortBy.Length },
          )}
          onClick={() => setSortType(SortBy.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={handleReset}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {preparedList.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
