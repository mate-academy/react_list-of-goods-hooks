import { useState } from 'react';
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

  visibleGoods.sort((prev, next) => {
    switch (sortType) {
      case SortType.LENGTH:
        return prev.length - next.length;

      case SortType.ALPHABET:
        return prev.localeCompare(next);

      case SortType.NONE:
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
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  const reverse = () => setIsReversed(!isReversed);
  const reset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.ALPHABET)}
          type="button"
          className={sortType === SortType.ALPHABET
            ? 'button is-info'
            : 'button is-info is-light'}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.LENGTH)}
          type="button"
          className={sortType === SortType.LENGTH
            ? 'button is-success'
            : 'button is-success is-light'}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={isReversed
            ? 'button is-warning'
            : 'button is-warning is-light'}
        >
          Reverse
        </button>
        {(sortType || isReversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
