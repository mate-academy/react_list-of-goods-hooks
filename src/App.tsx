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
  alphabet = 'alphabet',
  length = 'length',
  toDefault = '',
}

function getParameterGood(
  goods: string[],
  type: SortType,
  isReversed: boolean,
): string[] {
  let preparedGoods = [...goods];

  if (type) {
    preparedGoods.sort((a, b) => {
      switch (type) {
        case SortType.alphabet:
          return a.localeCompare(b);
        case SortType.length:
          return a[SortType.length] - b[SortType.length];
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(SortType.toDefault);
  const [isReversed, setIsReversed] = useState(true);
  const sortField = getParameterGood(goodsFromServer, visibleGoods, isReversed);

  const reset = () => {
    setVisibleGoods(SortType.toDefault);
    setIsReversed(true);
  };

  const reverse = () => (
    isReversed
      ? setIsReversed(false)
      : setIsReversed(true)
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setVisibleGoods(SortType.alphabet)}
          type="button"
          className={cn('button is-info',
            { 'is-light': visibleGoods !== SortType.alphabet })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setVisibleGoods(SortType.length)}
          type="button"
          className={cn('button is-success',
            { 'is-light': visibleGoods !== SortType.length })}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={cn('button is-warning', { 'is-light': isReversed })}
        >
          Reverse
        </button>

        {visibleGoods && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortField.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
