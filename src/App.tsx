import React, { useState } from 'react';
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

enum SortType {
  None = 'None',
  Reversed = 'Reversed',
  Alphabetically = 'Alphabetically',
  AlphabeticallyReversed = 'AlphabeticallyReversed',
  ByLength = 'ByLength',
  ByLengthReversed = 'ByLengthReversed',
}

// Какое значение получить, если нажали "Reverse" при текущем sortType
const reversedMap: Record<SortType, SortType> = {
  [SortType.None]: SortType.Reversed,
  [SortType.Reversed]: SortType.None,
  [SortType.Alphabetically]: SortType.AlphabeticallyReversed,
  [SortType.AlphabeticallyReversed]: SortType.Alphabetically,
  [SortType.ByLength]: SortType.ByLengthReversed,
  [SortType.ByLengthReversed]: SortType.ByLength,
};

const isReversedType = (type: SortType) =>
  type === SortType.Reversed ||
  type === SortType.AlphabeticallyReversed ||
  type === SortType.ByLengthReversed;

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);

  const visibleGoods = [...goodsFromServer];

  switch (sortType) {
    case SortType.Alphabetically:
      visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SortType.AlphabeticallyReversed:
      visibleGoods.sort((good1, good2) => good2.localeCompare(good1));
      break;
    case SortType.ByLength:
      visibleGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    case SortType.ByLengthReversed:
      visibleGoods.sort((good1, good2) => good2.length - good1.length);
      break;
    case SortType.Reversed:
      visibleGoods.reverse();
      break;
    default:
      break;
  }

  function sortAlphabetically() {
    setSortType(prev =>
      isReversedType(prev)
        ? SortType.AlphabeticallyReversed
        : SortType.Alphabetically,
    );
  }

  function sortByLength() {
    setSortType(prev =>
      isReversedType(prev) ? SortType.ByLengthReversed : SortType.ByLength,
    );
  }

  function toggleReverse() {
    setSortType(reversedMap[sortType]);
  }

  function resetSorting() {
    setSortType(SortType.None);
  }

  const isAlphabetActive =
    sortType === SortType.Alphabetically ||
    sortType === SortType.AlphabeticallyReversed;

  const isLengthActive = sortType === SortType.ByLength
    || sortType === SortType.ByLengthReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isAlphabetActive ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isLengthActive ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversedType(sortType) ? '' : 'is-light'}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {sortType !== SortType.None && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSorting}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
