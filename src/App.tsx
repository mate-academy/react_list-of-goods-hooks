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
  ALPABET,
  LENGTH,
}

export function getReorderedGoods(
  goods: string[],
  isReversed: boolean,
  sortType: SortType,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((a, b): number => {
    switch (sortType) {
      case SortType.ALPABET:
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

  return visibleGoods;
}

export const App = () => {
  const [isReversed, togleReverset] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const sortedGoods = getReorderedGoods(
    goodsFromServer,
    isReversed,
    sortType,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            {
              'is-light': sortType !== SortType.ALPABET,
            },
          )}
          onClick={() => setSortType(SortType.ALPABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={() => togleReverset(!isReversed)}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            onClick={() => {
              setSortType(SortType.NONE);
              togleReverset(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        <ul>
          {sortedGoods.map(good => (
            <li key={good} data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
