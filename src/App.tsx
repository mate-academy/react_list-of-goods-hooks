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

export const App: React.FC = () => {
  enum SortType {
    byLength,
    byAlphabet,
    empty,
  }

  const [sortValue, setSortValue] = useState<SortType>(SortType.empty);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const sortGoods = (good1: string, good2: string): number => {
    switch (sortValue) {
      case SortType.byLength:
        return good1.length - good2.length;

      case SortType.byAlphabet:
        return good1.localeCompare(good2);

      default:
        return 0;
    }
  };

  const getPreparedGoods = (goods: string[]): string[] => (isReversed
    ? [...goods].sort(sortGoods).reverse()
    : [...goods].sort(sortGoods));

  const checkState = () => (sortValue !== SortType.empty
    || isReversed !== false);

  const goods = getPreparedGoods(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortValue !== SortType.byAlphabet ? 'is-light' : ''}`}
          onClick={() => setSortValue(SortType.byAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortValue !== SortType.byLength ? 'is-light' : ''}`}
          onClick={() => setSortValue(SortType.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(checkState()) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortValue(SortType.empty);
              setIsReversed(false);
            }}
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
