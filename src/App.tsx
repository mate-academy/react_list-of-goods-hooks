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
  LENGTH = 'length',
  ALPHABET = 'alphabet',
}

type SortState = SortType | '';

type FilterParams = {
  sortType: SortState;
  reverse: boolean;
};

function getPreparedGoods(
  goods: string[],
  { sortType, reverse }: FilterParams,
) {
  const prepared = [...goods];

  if (sortType) {
    prepared.sort((good1, good2) => {
      switch (sortType) {
        case SortType.LENGTH:
          return good1.length - good2.length;
        case SortType.ALPHABET:
          return good1.localeCompare(good2);

        default:
          throw new Error('Sorting went wrong...');
      }
    });
  }

  if (reverse) {
    prepared.reverse();
  }

  return prepared;
}

export const App: React.FC = () => {
  const [sortType, setsortType] = useState<SortState>('');
  const [reverse, setReverse] = useState(false);

  const goods = getPreparedGoods(goodsFromServer, { sortType, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType !== SortType.ALPHABET && 'is-light'
          }`}
          onClick={() => setsortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType !== SortType.LENGTH && 'is-light'
          }`}
          onClick={() => setsortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reverse && 'is-light'}`}
          onClick={() => setReverse((prev) => !prev)}
        >
          Reverse
        </button>

        {(sortType || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverse(false);
              setsortType('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
