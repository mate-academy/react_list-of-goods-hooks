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
  SortByLength,
  SortByAlphabet,
  Initial,
}

const getPreparedGoods = (
  goods: string[],
  sortValue: SortType,
  isReversed: boolean,
): string[] => {
  const preparedGoods = [...goods].sort((good1: string, good2: string) => {
    switch (sortValue) {
      case SortType.SortByLength:
        return good1.length - good2.length;

      case SortType.SortByAlphabet:
        return good1.localeCompare(good2);

      default:
        return 0;
    }
  });

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortValue, setSortValue] = useState<SortType>(SortType.Initial);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const setInitialValues = () => {
    setSortValue(SortType.Initial);
    setIsReversed(false);
  };

  const isSortApplied = sortValue !== SortType.Initial || isReversed !== false;

  const goods = getPreparedGoods(goodsFromServer, sortValue, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortValue !== SortType.SortByAlphabet ? 'is-light' : ''}`}
          onClick={() => setSortValue(SortType.SortByAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortValue !== SortType.SortByLength ? 'is-light' : ''}`}
          onClick={() => setSortValue(SortType.SortByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed((prevValue) => !prevValue)}
        >
          Reverse
        </button>

        {(isSortApplied) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setInitialValues()}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {goods && goods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
