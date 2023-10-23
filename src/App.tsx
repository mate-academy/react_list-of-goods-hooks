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
  Alphabeticaly = 'Alphabeticaly',
  Length = 'Length',
}

interface SortParametrs {
  typeOfSort: string;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { typeOfSort, isReversed }: SortParametrs,
) {
  let preparedGoods = [...goods];

  if (typeOfSort) {
    preparedGoods = preparedGoods.sort((good1, good2) => {
      switch (typeOfSort) {
        case SortType.Alphabeticaly:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [typeOfSort, setTypeOfSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleEffects = getPreparedGoods(
    goodsFromServer, { typeOfSort, isReversed },
  );

  const handleSort = (sortType: SortType) => {
    setTypeOfSort(sortType);
  };

  const handleReset = () => {
    setTypeOfSort('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${SortType.Alphabeticaly !== typeOfSort && 'is-light'}`}
          onClick={() => handleSort(SortType.Alphabeticaly)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${SortType.Length !== typeOfSort && 'is-light'}`}
          onClick={() => handleSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(typeOfSort || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleReset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleEffects.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
