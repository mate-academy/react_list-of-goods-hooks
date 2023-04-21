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

  switch (sortType) {
    case SortType.LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;

    case SortType.ALPHABET:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.NONE:
      break;

    default:
      throw new Error('something went wrong');
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReserved] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const sortByAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const toggleReverse = () => {
    setIsReserved(!isReversed);
  };

  const reset = () => {
    setIsReserved(false);
    setSortType(SortType.NONE);
  };

  const goods = getReorderedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  const sortAphabetClassName = classNames('button is-info', {
    'is-light': sortType !== SortType.ALPHABET,
  });

  const sortLengthClassName = classNames('button is-success', {
    'is-light': sortType !== SortType.LENGTH,
  });

  const reverseClassName = classNames(
    'button is-warning',
    { 'is-light': !isReversed },
  );

  const resetClassName = classNames(
    'button is-danger is-light',
    {
      'is-hidden':
      goodsFromServer[1] === goods[1],
    },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortAphabetClassName}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortLengthClassName}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverseClassName}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        <button
          type="button"
          className={resetClassName}
          onClick={reset}
        >
          Reset
        </button>
      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li key={good} data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
