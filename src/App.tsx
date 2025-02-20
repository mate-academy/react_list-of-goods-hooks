import 'bulma/css/bulma.css';
import { useState } from 'react';
import classNames from 'classnames';
import './App.scss';

// Enum for sorting types
enum SortType {
  NONE = '',
  NAME = 'name',
  LENGTH = 'length',
}

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

// Define the sort function
const sortGoods = (
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
): string[] => {
  const sortedGoods = [...goods];

  if (sortField !== SortType.NONE) {
    switch (sortField) {
      case SortType.NAME:
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.LENGTH:
        sortedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }
  }

  // Reversing if needed
  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

const App = () => {
  // Defining the state with proper types
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = sortGoods(goodsFromServer, sortField, isReversed);

  // Sorting by length
  const sortByLength = () => {
    setSortField(SortType.LENGTH);
  };

  // Sorting alphabetically
  const sortByAlphabet = () => {
    setSortField(SortType.NAME);
  };

  // Reverse the sorting
  const reverse = () => {
    setIsReversed(prev => !prev);
  };

  // Reset the sorting
  const reset = () => {
    setSortField(SortType.NONE);
    setIsReversed(false);
  };

  const isResetVisible = sortField !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <button
        onClick={sortByAlphabet}
        type="button"
        className={classNames({
          active: sortField === SortType.NAME,
          'is-light': sortField !== SortType.NAME,
        })}
      >
        Sort alphabetically
      </button>
      <button
        onClick={sortByLength}
        type="button"
        className={classNames({
          active: sortField === SortType.LENGTH,
          'is-light': sortField !== SortType.LENGTH,
        })}
      >
        Sort by length
      </button>
      <button
        onClick={reverse}
        type="button"
        className={classNames({
          active: isReversed,
          'is-light': !isReversed,
        })}
      >
        Reverse
      </button>
      {isResetVisible && (
        <button
          onClick={reset}
          type="button"
          className="button is-danger is-light"
        >
          Reset
        </button>
      )}
      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
