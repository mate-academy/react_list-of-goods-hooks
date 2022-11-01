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

export function getReorederedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return good1.localeCompare(good2);

      case SortType.LENGTH:
        return good1.length - good2.length;

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

  const onClickAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const onClickReversed = () => {
    setReverse(!isReversed);
  };

  const onClickLength = () => {
    setSortType(SortType.LENGTH);
  };

  const onClickReset = () => {
    setSortType(SortType.NONE);
    setReverse(false);
  };

  const Goods = getReorederedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames(
              'button is-info',
              { 'is-light': sortType !== SortType.ALPHABET },
            )
          }
          onClick={onClickAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={onClickLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames(
              'button is-warning',
              { 'is-light': isReversed === false },
            )
          }
          onClick={onClickReversed}
        >
          Reverse
        </button>
        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className={
              classNames(
                'button is-danger',
                { 'is-light': sortType !== SortType.NONE },
              )
            }
            onClick={onClickReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {Goods.map(good => (
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
