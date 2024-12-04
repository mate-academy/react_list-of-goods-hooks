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

const SOTR_BY_ALPHABET: string = 'alphabet';
const SOTR_BY_LENGTH: string = 'length';

function SortGoodsFrom(
  originArray: string[],
  reverse: boolean,
  sortBy: string,
) {
  let mutateArray: string[] = [...originArray];

  switch (sortBy) {
    case SOTR_BY_ALPHABET:
      mutateArray = mutateArray.sort((a, b) => a.localeCompare(b));
      break;
    case SOTR_BY_LENGTH:
      mutateArray = mutateArray.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reverse) {
    mutateArray.reverse();
  }

  return mutateArray;
}

export const App: React.FC = () => {
  const [isReverse, setIsReverse] = useState(false);
  const [sort, setSort] = useState('');

  const visibleGoods: string[] = SortGoodsFrom(
    goodsFromServer,
    isReverse,
    sort,
  );

  function Reset() {
    setIsReverse(false);
    setSort('');
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-danger ${sort === SOTR_BY_ALPHABET ? null : 'is-light'}`}
          onClick={() => setSort(SOTR_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-danger ${sort === SOTR_BY_LENGTH ? null : 'is-light'}`}
          onClick={() => setSort(SOTR_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-danger ${isReverse ? null : 'is-light'}`}
          onClick={() =>
            !isReverse ? setIsReverse(true) : setIsReverse(false)
          }
        >
          Reverse
        </button>

        {isReverse || sort ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => Reset()}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(goods => (
          <li data-cy="Good" key={goods}>
            {goods}
          </li>
        ))}
      </ul>
    </div>
  );
};
