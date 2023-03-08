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
  isReversed: boolean,
  sortType: SortType,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((prevGood, currGood) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return prevGood.localeCompare(currGood);

      case SortType.LENGTH:
        return prevGood.length - currGood.length;

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
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const reverse = () => {
    setReverse(current => !current);
  };

  const sortByType = (type: SortType) => {
    setSortType(type);
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setReverse(false);
  };

  const showResetButton = sortType !== SortType.NONE || isReversed;
  const reorderedGoods = getReorderedGoods(
    goodsFromServer, { isReversed, sortType },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info', {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={() => {
            sortByType(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success', {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={() => {
            sortByType(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning', {
              'is-light': !isReversed,
            },
          )}
          onClick={() => {
            reverse();
          }}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              reset();
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {
            reorderedGoods.map(good => (
              <li data-cy="Good" key={good}>
                {good}
              </li>
            ))
          }
        </ul>
      </ul>
    </div>
  );
};
