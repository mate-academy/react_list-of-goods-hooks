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
  const visibleGoods: string[] = [...goods];

  visibleGoods.sort((a, b) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return a.localeCompare(b);
      case SortType.LENGTH:
        return a.length - b.length;
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

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            `button is-info ${sortType === SortType.ALPHABET
              ? '' : 'is-light'
            }`
          }
          onClick={() => {
            setSortType(SortType.ALPHABET);
            setIsReversed(isReversed);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            `button is-success ${sortType === SortType.LENGTH
              ? '' : 'is-light'
            }`
          }
          onClick={() => {
            setSortType(SortType.LENGTH);
            setIsReversed(isReversed);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            `button is-warning ${isReversed
              ? '' : 'is-light'
            }`
          }
          onClick={() => {
            setSortType(sortType);
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>
        {(sortType !== 0
          || isReversed === true)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortType(SortType.NONE);
                setIsReversed(false);
              }}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {getReorderedGoods(goodsFromServer, { sortType, isReversed })
          .map(good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))}
      </ul>
    </div>
  );
};
