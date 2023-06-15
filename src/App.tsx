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
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((firstGood, secondGood) => {
    switch (sortType) {
      case (SortType.ALPHABET):
        return firstGood.localeCompare(secondGood);

      case (SortType.LENGTH):
        return firstGood.length - secondGood.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const isReset = (
    isReversed
    || sortType === SortType.ALPHABET
    || sortType === SortType.LENGTH
  );
  const reorderedGoods = getReorderedGoods(
    goodsFromServer, { sortType, isReversed },
  )
    .map(good => (
      <li
        data-cy="Good"
        key={good}
      >
        {good}
      </li>
    ));

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {
          (isReset)
            && (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={
                  () => {
                    setSortType(SortType.NONE);
                    setIsReversed(false);
                  }
                }
              >
                Reset
              </button>
            )
        }

      </div>

      <ul>
        <ul>
          {reorderedGoods}
        </ul>
      </ul>
    </div>
  );
};
