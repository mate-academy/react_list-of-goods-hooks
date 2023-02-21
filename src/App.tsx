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

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((item1, item2) => {
    switch (sortType) {
      case SortType.LENGTH:
        return item1.length - item2.length;
      case SortType.ALPHABET:
        return item1.localeCompare(item2);

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
  const [isReversed, reverseList] = useState(false);
  const [sortType, sortMethod] = useState(SortType.NONE);

  const goodsRender = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  const reset = () => {
    reverseList(false);
    sortMethod(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button', 'is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={() => (sortMethod(SortType.ALPHABET))}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button', 'is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => (sortMethod(SortType.LENGTH))}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button', 'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => (reverseList(!isReversed))}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE)
        && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsRender.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
