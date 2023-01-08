import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
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

// type ReorderOptions = {
//   sortType: SortType,
//   isReversed: boolean,
// };

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.LENGTH:
      visibleGoods.sort((a, b) => (
        a.length - b.length
      ));
      break;

    case SortType.ALPHABET:
      visibleGoods.sort((a, b) => (
        a.localeCompare(b)
      ));
      break;

    case SortType.NONE:
    default:
      break;
  }

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReversedStatus] = useState(false);

  const [sortType, setSortType] = useState(SortType.NONE);

  const goods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  const handleLengthSortClick = () => setSortType(SortType.LENGTH);

  const handleNameSortClick = () => setSortType(SortType.ALPHABET);

  const handleReverseClick = () => setReversedStatus(current => (!current));

  const handleResetClick = () => {
    setSortType(SortType.NONE);
    setReversedStatus(false);
  };

  const isResetVisible = isReversed || sortType !== SortType.NONE;

  return (
    <div className="section content box">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info', {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={handleNameSortClick}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success', {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={handleLengthSortClick}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={handleReverseClick}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetClick}
          >
            Reset
          </button>
        )}
      </div>

      <ul className="list">
        <ul>
          {goods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
