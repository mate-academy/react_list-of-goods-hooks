import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

interface ReorderedOptions {
  sortType: SortType;
  isReversed: boolean;
}

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

function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderedOptions,
) {
  let visibleGoods = [...goods];

  switch (sortType) {
    case 0:
      visibleGoods = [...goodsFromServer];
      break;

    case 1:
      visibleGoods.sort((goodA, goodB) => goodA.localeCompare(goodB));
      break;

    case 2:
      visibleGoods.sort((goodA, goodB) => goodA.length - goodB.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const reorderedGoods = getReorderedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== 1 && 'is-light'}`}
          onClick={() => setSortType(1)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== 2 && 'is-light'}`}
          onClick={() => setSortType(2)}
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

        <button
          type="button"
          className="button is-danger is-light"
          style={{
            display: sortType !== 0 || isReversed ? 'inline' : 'none',
          }}
          onClick={() => {
            setSortType(0);
            setIsReversed(false);
          }}
        >
          Reset
        </button>
      </div>

      <ul>
        {reorderedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
