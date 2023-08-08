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

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setThisType] = useState(SortType.NONE);

  const listGoods = getReorderedGoods(
    goodsFromServer, { sortType, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={() => setThisType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            'is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={() => setThisType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            'is-warning',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={() => setIsReversed(value => !value)}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE)
        && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setThisType(SortType.NONE);
            }}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {
          listGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
