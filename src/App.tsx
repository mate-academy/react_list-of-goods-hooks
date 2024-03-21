import 'bulma/css/bulma.css';
import './App.scss';

import React from 'react';

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
  sortType: SortType;
  isReversed: boolean;
};

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  // Sort and reverse goods if needed
  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort();
      break;
    case SortType.LENGTH:
      visibleGoods.sort((a, b) => {
        return a.length - b.length;
      });
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
  const [isReversed, setIsReversed] = React.useState(false);
  const [sortType, setSortType] = React.useState(SortType.NONE);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortType(SortType.ALPHABET);
          }}
          type="button"
          className={`button is-info ${sortType !== SortType.ALPHABET ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortType(SortType.LENGTH);
          }}
          type="button"
          className={`button is-success ${sortType !== SortType.LENGTH ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(p => {
              return !p;
            });
          }}
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE) && (
          <button
            onClick={() => {
              setSortType(SortType.NONE);
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {getReorderedGoods(goodsFromServer, { sortType, isReversed }).map(
            (good, index) => (
              <li key={index} data-cy="Good">
                {good}
              </li>
            ),
          )}
        </ul>
      </ul>
    </div>
  );
};
