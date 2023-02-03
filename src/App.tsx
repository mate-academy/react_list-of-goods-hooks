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

      case SortType.NONE:
        return 0;

      default:
        throw new Error('Invalid sort type');
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setReversed] = useState<boolean>(false);
  const isModified = sortType !== SortType.NONE || isReversed;

  const sortedGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  const reverseList = () => {
    setReversed((currentReversed) => (
      !currentReversed
    ));
  };

  const resetList = () => {
    setSortType(SortType.NONE);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info ',
            {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={() => {
            setSortType(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success ',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={() => {
            setSortType(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning ',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={reverseList}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetList}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {sortedGoods.map((good) => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
