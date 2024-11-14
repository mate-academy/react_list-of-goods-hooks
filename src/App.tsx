import React, { useState } from 'react';
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
  Alphabetic = 'alphabetic',
  Length = 'length',
  Reset = 'reset',
  Reverse = 'reverse',
}

function sortingElement(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
): string[] {
  const sortedGoods = [...goods];

  switch (sortField) {
    case SortType.Alphabetic:
      sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SortType.Length:
      sortedGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    case SortType.Reset:
      return goodsFromServer;
    default:
      break;
  }

  return isReversed ? sortedGoods.reverse() : sortedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>();
  const [isReversed, setisReversed] = useState(false);

  const goods = sortingElement(
    goodsFromServer,
    sortField as SortType,
    isReversed,
  );

  const handleSort = (field: SortType) => {
    if (field === SortType.Reverse) {
      setisReversed(!isReversed);
    } else {
      setSortField(field);
    }
  };

  const handleReset = () => {
    setSortField('');
    setisReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.Alphabetic ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.Alphabetic)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.Length ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.Reverse)}
        >
          Reverse
        </button>
        {(sortField || isReversed) && (
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
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
