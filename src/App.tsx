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

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  return isReversed ? visibleGoods.reverse() : visibleGoods;
}

export const App: React.FC = () => {
  const { NONE, ALPHABET, LENGTH } = SortType;
  const [sortType, setSortType] = useState(0);
  const [isReversed, setReverse] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(1)}
          className={classNames('button is-info', {
            'is-light': sortType !== ALPHABET,
          })}
          type="button"
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(2)}
          className={classNames('button is-info', {
            'is-light': sortType !== LENGTH,
          })}
          type="button"
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!isReversed)}
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          type="button"
        >
          Reverse
        </button>

        {(sortType !== NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(0);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getReorderedGoods(goodsFromServer, sortType, isReversed).map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
