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
  RESET,
}

export const App: React.FC = () => {
  const [sortType, setSortBy] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  let isResetButton = false;

  let visibleGoods = [...goodsFromServer];

  switch (sortType) {
    case SortType.NONE:
      isResetButton = false;
      break;

    case SortType.ALPHABET:
      visibleGoods = visibleGoods.sort(
        (a, b) => (a.localeCompare(b.toString())
        ),
      );
      isResetButton = true;
      break;

    case SortType.LENGTH:
      visibleGoods = visibleGoods.sort(
        (a, b) => (a.length - b.length),
      );
      isResetButton = true;
      break;

    case SortType.RESET:
      visibleGoods = [...goodsFromServer];
      isResetButton = false;
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
    isResetButton = true;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button',
              'is-info',
              { 'is-light': sortType !== SortType.ALPHABET },
            )
          }
          onClick={() => setSortBy(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-success',
              { 'is-light': sortType !== SortType.LENGTH },
            )
          }
          onClick={() => setSortBy(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-warning',
              { 'is-light': !isReversed },
            )
          }
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.RESET);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
