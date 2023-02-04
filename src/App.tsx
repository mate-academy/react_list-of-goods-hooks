import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
      case SortType.ALPHABET:
        return firstGood.localeCompare(secondGood);

      case SortType.LENGTH:
        return firstGood.length - secondGood.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSort] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);
  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  function reset() {
    setSort(SortType.NONE);
    setReverse(false);
  }

  function reverseGoods() {
    setReverse(!isReversed);
  }

  function sortByLength() {
    setSort(SortType.LENGTH);
  }

  function sortByAlpabet() {
    setSort(SortType.ALPHABET);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlpabet}
          type="button"
          className={classNames(
            'button is-info', { 'is-light': sortType !== SortType.ALPHABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={classNames(
            'button is-success is-light', { 'is-light': SortType.LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={reverseGoods}
          type="button"
          className={classNames(
            'button is-warning', { 'is-light': isReversed === false },
          )}
        >
          Reverse
        </button>

        {((sortType !== SortType.NONE) || (isReversed === true))
        && (
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
        <ul>
          {goods.map(good => (
            <li
              key={good}
              data-cy="Good"
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
