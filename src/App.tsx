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
  Default = 'Default',
  Alphabet = 'Alphabet',
  Length = 'Length',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  reverse: boolean,
): string[] {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods = [...preparedGoods].reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, reverse);
  const isDifferent = (): boolean => {
    return visibleGoods.some((good, index) => good !== goodsFromServer[index]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabet)}
          type="button"
          className={
            sortField === SortType.Alphabet
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.Length)}
          type="button"
          className={
            sortField === SortType.Length
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(prev => !prev)}
          type="button"
          className={reverse ? 'button is-info' : 'button is-info is-light'}
        >
          Reverse
        </button>

        {isDifferent() && (
          <button
            onClick={() => {
              setSortField(SortType.Default);
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
        {visibleGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
