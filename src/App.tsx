import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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

  visibleGoods.sort((first, second) => {
    switch (sortType) {
      case SortType.LENGTH:
        return first.length - second.length;

      case SortType.ALPHABET:
        return first.localeCompare(second);

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

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

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const reorderedGoods = getReorderedGoods(
    goodsFromServer, { sortType, isReversed },
  );

  const hasOrderChanged = isReversed || sortType !== SortType.NONE;

  const setClass = (condition: boolean) => {
    return classNames('button', { 'is-light': condition });
  };

  const setReset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`is-info ${setClass(sortType !== SortType.ALPHABET)}`}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`is-success ${setClass(sortType !== SortType.LENGTH)}`}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`is-warning ${setClass(!isReversed)}`}
          onClick={() => setIsReversed(current => !current)}
        >
          Reverse
        </button>

        {hasOrderChanged && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => setReset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {reorderedGoods.map(item => (
            <li
              data-cy="Good"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
