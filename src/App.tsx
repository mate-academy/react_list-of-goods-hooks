import React, { useState } from 'react';
import classNames from 'classnames';
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
  sortType: SortType;
  isReversed: boolean;
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((g1, g2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return g1.localeCompare(g2);

      case SortType.LENGTH:
        return g1.length - g2.length;

      case SortType.NONE:
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
  const [sortType, sortTypeEdit] = useState(SortType.NONE);
  const [isReversed, isReversedEdit] = useState(false);
  const isReset = sortType !== SortType.NONE || isReversed;

  const handleReverseEvent = () => {
    isReversedEdit((prev) => !prev);
  };

  const handleSortEvent = (type: SortType) => {
    switch (type) {
      case SortType.NONE:
        sortTypeEdit(SortType.NONE);
        isReversedEdit(false);
        break;

      case SortType.ALPHABET:
      case SortType.LENGTH:
        sortTypeEdit(type);
        break;

      default:
        break;
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={() => handleSortEvent(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => handleSortEvent(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverseEvent}
        >
          Reverse
        </button>

        {isReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleSortEvent(SortType.NONE)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getReorderedGoods(
          goodsFromServer,
          { sortType, isReversed },
        )
          .map((good) => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
      </ul>
    </div>
  );
};
