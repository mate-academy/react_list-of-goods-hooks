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

enum SortField {
  None = 'None',
  Alphabetically = 'Alphabetically',
  ByLength = 'ByLength',
}

type SortConfig = {
  field: SortField;
  reversed: boolean;
};

export const App: React.FC = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: SortField.None,
    reversed: false,
  });

  const visibleGoods = [...goodsFromServer];

  switch (sortConfig.field) {
    case SortField.Alphabetically:
      visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SortField.ByLength:
      visibleGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  if (sortConfig.reversed) {
    visibleGoods.reverse();
  }

  function sortAlphabetically() {
    setSortConfig(prev => ({ ...prev, field: SortField.Alphabetically }));
  }

  function sortByLength() {
    setSortConfig(prev => ({ ...prev, field: SortField.ByLength }));
  }

  function toggleReverse() {
    setSortConfig(prev => ({ ...prev, reversed: !prev.reversed }));
  }

  function resetSorting() {
    setSortConfig({ field: SortField.None, reversed: false });
  }

  const isAlphabetActive = sortConfig.field === SortField.Alphabetically;
  const isLengthActive = sortConfig.field === SortField.ByLength;
  const isResetVisible =
    sortConfig.field !== SortField.None || sortConfig.reversed;

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
          className={`button is-warning ${sortConfig.reversed ? '' : 'is-light'}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {isResetVisible && (
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
