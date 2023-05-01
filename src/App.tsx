import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  REVERSE,
  RESET,
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
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setisReversed] = useState(false);

  const getCorrectMethod = (type: SortType) => {
    switch (type) {
      case SortType.REVERSE:
        setisReversed(!isReversed);
        break;

      case SortType.LENGTH:
        setSortType(SortType.LENGTH);
        break;

      case SortType.ALPHABET:
        setSortType(SortType.ALPHABET);
        break;

      case SortType.RESET:
        setSortType(SortType.NONE);
        setisReversed(false);
        break;

      default:
        throw new Error();
    }
  };

  const visibleGoods = getReorderedGoods(goodsFromServer,
    {
      isReversed,
      sortType,
    });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={() => getCorrectMethod(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => getCorrectMethod(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => getCorrectMethod(SortType.REVERSE)}
        >
          Reverse
        </button>

        {isReversed || sortType !== SortType.NONE
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => getCorrectMethod(SortType.RESET)}
            >
              Reset
            </button>
          )
          : null}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
