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
  alphabet = 'alphabet',
  length = 'length',
  default = '',
}

interface SortParams {
  sortField: SortType,
  isReverse: boolean,
}

function getPreparedField(
  goods:string[],
  { sortField, isReverse }: SortParams,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.alphabet:
          return good1.localeCompare(good2);
        case SortType.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [isReverse, setReverse] = useState<boolean>(false);
  const [sortField, setSortField] = useState<SortType>(SortType.default);
  const visibleGoods = getPreparedField(
    goodsFromServer,
    { sortField, isReverse },
  );

  const handleButtonClick = () => {
    setReverse(!isReverse);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.alphabet)}
          type="button"
          className={`button is-info ${sortField !== SortType.alphabet ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.length)}
          type="button"
          className={`button is-success ${sortField !== SortType.length ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={handleButtonClick}
          type="button"
          className={`button is-warning ${!isReverse ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        {visibleGoods.toString() !== goodsFromServer.toString() && (
          <button
            onClick={() => {
              setSortField(SortType.default);
              setReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => <li data-cy="Good">{good}</li>)}
      </ul>
    </div>
  );
};
