import React, { useState } from 'react';
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

  visibleGoods.sort((g1, g2): number => {
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
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const updatedGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(SortType.ALPHABET)}
          className={classNames(
            'button is-info', {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SortType.LENGTH)}
          className={classNames(
            'button is-success', {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(!isReversed)}
          className={classNames(
            'button is-warning', {
              'is-light': !isReversed,
            },
          )}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortType(SortType.NONE);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {updatedGoods.map(good => (
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
