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

function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((f1, f2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return f1.localeCompare(f2);
      case SortType.LENGTH:
        return f1.length - f2.length;
      default:
        return SortType.NONE;
    }
  });
  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);

  const isResetButtonVisible = isReversed || sortType !== SortType.NONE;

  const getSortAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const getSortLength = () => {
    setSortType(SortType.LENGTH);
  };

  const getSortNone = () => {
    setSortType(SortType.NONE);
    setReverse(false);
  };

  const getRevers = () => {
    setReverse((prevReverse) => !prevReverse);
  };

  const currentGoods = getReorderedGoods(
    goodsFromServer, { sortType, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={getSortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={getSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': !isReversed,
          })}
          onClick={getRevers}
        >
          Reverse
        </button>
        {isResetButtonVisible && (
          <button
            onClick={getSortNone}
            type="button"
            className="button is-info is-light"
          >
            Reset
          </button>
        )}

      </div>
      <ul>
        <ul>
          {currentGoods.map((good) => (
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
