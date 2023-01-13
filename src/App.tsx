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

  if (sortType) {
    visibleGoods.sort((g1, g2) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return g1.localeCompare(g2);

        case SortType.LENGTH:
          return g1.length - g2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReverseState] = useState(false);

  const visibleGoods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  const {
    NONE,
    ALPHABET,
    LENGTH,
  } = SortType;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            {
              'is-light': sortType !== ALPHABET,
            },
          )}
          onClick={() => setSortType(ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            {
              'is-light': sortType !== LENGTH,
            },
          )}
          onClick={() => setSortType(LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setReverseState(!isReversed)}
        >
          Reverse
        </button>
        {(isReversed || sortType !== NONE) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverseState(false);
              setSortType(NONE);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {
          visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
