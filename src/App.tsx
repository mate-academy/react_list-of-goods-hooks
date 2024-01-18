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
  LENGTH,
  ALPHABET,
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

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((g1, g2) => {
      return g1.length - g2.length;
    });
  }

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((g1, g2) => {
      return g1.localeCompare(g2);
    });
  }

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;

  // eslint-disable-next-line no-console
  // console.log(sortType, isReversed);
}

export function App() {
  const [sortType, sort] = useState(SortType.NONE);
  const [isReversed, reverse] = useState(false);

  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => sort(SortType.ALPHABET)}
          type="button"
          className={
            classNames(
              'button',
              'is-info',
              { 'is-light': sortType !== SortType.ALPHABET },
            )
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => sort(SortType.LENGTH)}
          type="button"
          className={
            classNames(
              'button',
              'is-success',
              { 'is-light': sortType !== SortType.LENGTH },
            )
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => reverse(!isReversed)}
          type="button"
          className={
            classNames(
              'button',
              'is-warning',
              { 'is-light': isReversed === false },
            )
          }
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            onClick={() => {
              sort(SortType.NONE);
              reverse(false);
            }}
            className={
              classNames(
                'button',
                'is-danger',
                'is-light',
              )
            }
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
}
