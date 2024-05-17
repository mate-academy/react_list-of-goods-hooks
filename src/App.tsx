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

enum SortTypeEnum {
  SORT_ALPHABETICALLY = 'sortAlphabetically',
  SORT_BY_LENGTH = 'sortByLength',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = [...goodsFromServer];

  if (sortField) {
    visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortTypeEnum.SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SortTypeEnum.SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  const handleReset = () => {
    setIsReversed(false);
    setSortField('');
  };

  const handleReverse = () => {
    setIsReversed(prevState => !prevState);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortTypeEnum.SORT_ALPHABETICALLY)}
          type="button"
          className={`button is-info ${sortField !== SortTypeEnum.SORT_ALPHABETICALLY ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortTypeEnum.SORT_BY_LENGTH)}
          type="button"
          className={`button is-success ${sortField !== SortTypeEnum.SORT_BY_LENGTH ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => handleReverse()}
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(visibleGood => (
          <li key={visibleGood} data-cy="Good">
            {visibleGood}
          </li>
        ))}
      </ul>
    </div>
  );
};
