import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

// The main component with the corrected logic
export const App: React.FC = () => {
  enum SortType {
    NONE = 'none',
    ALPH = 'alph',
    LENGTH = 'length',
  }

  const goodsFromServer = [
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

  interface FilterParams {
    sortField: SortType;
    isReversed: boolean;
  }

  // State variables for sort type and reverse order
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [reverse, setReverse] = useState(false);

  // A memoized function to sort the goods based on state
  function getPreparedGoods(
    goods: string[],
    { sortField, isReversed }: FilterParams,
  ): string[] {
    const prepGoods = [...goods];

    if (sortField) {
      prepGoods.sort((a, b) => {
        switch (sortField) {
          case SortType.ALPH:
            return a.localeCompare(b);
          case SortType.LENGTH:
            return a.length - b.length;
          default:
            return 0;
        }
      });
    }

    if (isReversed) {
      return prepGoods.reverse();
    }

    return prepGoods;
  }

  // Function to reset all sorting and reverse states
  const handleReset = () => {
    setSortType(SortType.NONE);
    setReverse(false);
  };

  // Check if any sorting or reverse is active to show the reset button
  const showReset = sortType !== SortType.NONE || reverse;

  return (
    <div className="section content">
      <div className="buttons">
        {/* Alphabetical sort button */}
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPH ? 'is-active' : 'is-light'}`}
          onClick={() =>
            setSortType(prev =>
              prev === SortType.ALPH ? SortType.NONE : SortType.ALPH,
            )
          }
        >
          Sort alphabetically
        </button>

        {/* Length sort button */}
        <button
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? 'is-active' : 'is-light'}`}
          onClick={() =>
            setSortType(prev =>
              prev === SortType.LENGTH ? SortType.NONE : SortType.LENGTH,
            )
          }
        >
          Sort by length
        </button>

        {/* Reverse button */}
        <button
          type="button"
          className={`button is-warning ${reverse ? 'is-active-reverse' : 'is-light'}`}
          onClick={() => setReverse(prev => !prev)}
        >
          Reverse
        </button>

        {/* Reset button - now correctly named and styled */}
        {showReset && (
          <button
            type="button"
            className="button is-active-reset "
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getPreparedGoods(goodsFromServer, {
          sortField: sortType,
          isReversed: reverse,
        }).map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
