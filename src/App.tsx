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
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  visibleGoods.sort((g1, g2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return g1.localeCompare(g2);
      case SortType.LENGTH:
        return g1.length - g2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  // Sort and reverse goods if needed
  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setReversMode] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.ALPHABET && 'is-light'}`}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
          onClick={() => setSortType(SortType.LENGTH)}

        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={() => setReversMode(!isReversed)}
        >
          Reverse
        </button>

        {sortType !== SortType.NONE || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              return (
                setSortType(SortType.NONE),
                setReversMode(false)
              );
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {getReorderedGoods(goodsFromServer, { sortType, isReversed })
          .map(good => (
            <li key={good}>
              {good}
            </li>
          ))}
      </ul>
    </div>
  );
};
