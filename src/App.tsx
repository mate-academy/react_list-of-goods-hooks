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
  SORT_ALPHABET = 'alphabetically',
  SORT_LENGTH = 'length',
  DEFAULT = 'all',
}

type Props = {
  sortType: SortType;
  isReversed: boolean;
};

function prepareGoods(goods: string[], { sortType, isReversed }: Props) {
  let prepared = [...goods];

  if (sortType) {
    prepared.sort((good1, good2) => {
      switch (sortType) {
        case SortType.SORT_ALPHABET:
          return good1.localeCompare(good2);

        case SortType.SORT_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepared = prepared.reverse();
  }

  return prepared;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.DEFAULT);
  const [isReversed, setReversed] = useState(false);
  const sortedGoods = prepareGoods(goodsFromServer, { sortType, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.SORT_ALPHABET ? '' : 'is-light'}`}
          onClick={() => {
            setSortType(SortType.SORT_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.SORT_LENGTH ? '' : 'is-light'}`}
          onClick={() => {
            setSortType(SortType.SORT_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(sortType !== SortType.DEFAULT || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortType(SortType.DEFAULT);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
