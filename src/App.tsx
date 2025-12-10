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
  lenght = 'lenght',
  empty = '',
}

function getSortedGoods(
  listOfGoods: string[],
  sortFiled: SortType,
  reverse: boolean,
): string[] {
  const preparedGoods = [...listOfGoods];

  if (sortFiled) {
    preparedGoods.sort((good1, good2) => {
      switch (sortFiled) {
        case SortType.alphabet:
          return good1.localeCompare(good2);
        case SortType.lenght:
          return good1.length - good2.length;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.empty);
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getSortedGoods(goodsFromServer, sortField, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.alphabet ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.lenght ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.lenght)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverse === true ? '' : 'is-light'}`}
          onClick={() => setReverse(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField !== '' || reverse === true) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.empty);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
