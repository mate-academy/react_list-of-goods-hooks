import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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

enum Constant {
  SORT_ALPHABET = 'alphabetically',
  SORT_LENGTH = 'length',
  DEFAULT = 'all',
}

type Props = {
  sortType: Constant;
  isReversed: boolean;
};

function getPrepared(goods: string[], { sortType, isReversed }: Props) {
  let prepared = [...goods];

  if (sortType) {
    prepared.sort((good1, good2) => {
      switch (sortType) {
        case Constant.SORT_ALPHABET:
          return good1.localeCompare(good2);

        case Constant.SORT_LENGTH:
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
  const [sortType, setSortType] = useState(Constant.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods = getPrepared(goodsFromServer, { sortType, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== Constant.SORT_ALPHABET && 'is-light'}`}
          onClick={() => setSortType(Constant.SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== Constant.SORT_LENGTH && 'is-light'}`}
          onClick={() => setSortType(Constant.SORT_LENGTH)}
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

        {(sortType !== Constant.DEFAULT || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(Constant.DEFAULT);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
