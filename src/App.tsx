import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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

  const getCorrectMethod = (name: string) => {
    switch (name) {
      case 'reverse':
        setisReversed(!isReversed);
        break;

      case 'sortByLength':
        setSortType(SortType.LENGTH);
        break;

      case 'sortByAlp':
        setSortType(SortType.ALPHABET);
        break;

      case 'reset':
        setSortType(SortType.NONE);
        setisReversed(false);
        break;

      default:
        throw new Error();
    }
  };

  const visibleGoods = getReorderedGoods(goodsFromServer,
    { isReversed, sortType });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortType === SortType.ALPHABET
            ? 'button is-info'
            : 'button is-info is-light'}
          onClick={() => getCorrectMethod('sortByAlp')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortType === SortType.LENGTH
            ? 'button is-success'
            : 'button is-success is-light'}
          onClick={() => getCorrectMethod('sortByLength')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={isReversed
            ? 'button is-warning'
            : 'button is-warning is-light'}
          onClick={() => getCorrectMethod('reverse')}
        >
          Reverse
        </button>

        {isReversed || sortType !== SortType.NONE
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => getCorrectMethod('reset')}
            >
              Reset
            </button>
          )
          : null}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
