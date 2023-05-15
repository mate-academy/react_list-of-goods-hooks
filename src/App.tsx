import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
// import { sortedLastIndexBy } from 'cypress/types/lodash';

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

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((g1: string, g2: string) => {
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

  return visibleGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReversed] = useState(false);

  const alphSorted = () => setSortType(SortType.ALPHABET);

  const lengthSorted = () => setSortType(SortType.LENGTH);

  const reversed = () => setReversed(!isReversed);

  const reset = () => {
    setSortType(SortType.NONE);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={alphSorted}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={lengthSorted}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reversed}
        >
          Reverse
        </button>
        {
          (isReversed || sortType !== SortType.NONE)
            ? (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={reset}
              >
                Reset
              </button>
            ) : ''
        }
      </div>

      <ul>
        <ul>
          {getReorderedGoods(goodsFromServer, { sortType, isReversed })
            .map(good => (
              <li data-cy="Good" key={good}>{good}</li>
            ))}
        </ul>
      </ul>
    </div>
  );
};
