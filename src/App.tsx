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
  None = '',
  Alphabet = 'abc',
  Length = 'len',
}

function prepareGoods(goods: string[], sortField: SortType): string[] {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SortType.Alphabet:
      return preparedGoods.sort((a, b) => a.localeCompare(b));
    case SortType.Length:
      return preparedGoods.sort((a, b) => a.length - b.length);
    default:
      return preparedGoods;
  }
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);

  const [isReversed, setIsReversed] = useState(false);

  const localeGoods = prepareGoods(goodsFromServer, sortField);
  const displayedGoods = isReversed ? [...localeGoods].reverse() : localeGoods;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SortType.Alphabet && 'is-light'}`}
          onClick={() => setSortField(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SortType.Length && 'is-light'}`}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed === false && 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField !== '' || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.None);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {displayedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
