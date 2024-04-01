import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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
  SORT_ALPHABET = 'alphabet',
  SORT_LENGTH = 'length',
  SORT_REVERSE = 'reverse',
  SORT_CLEAR = '',
}

type Goods = string[];

function sortGoods(
  goods: Goods,
  isLight: SortType,
  isReverse: SortType,
): Goods {
  let preparedGoods = [...goods];

  if (isLight) {
    preparedGoods.sort((good1, good2) => {
      switch (isLight) {
        case SortType.SORT_ALPHABET:
          return good1.localeCompare(good2);

        case SortType.SORT_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [isLight, setIsLight] = useState(SortType.SORT_CLEAR);
  const [isReverse, setIsReverse] = useState(SortType.SORT_CLEAR);
  const visibleGoods = sortGoods(goodsFromServer, isLight, isReverse);

  const reverse = () => {
    if (isReverse) {
      setIsReverse(SortType.SORT_CLEAR);
    } else {
      setIsReverse(SortType.SORT_REVERSE);
    }
  };

  const reset = () => {
    setIsLight(SortType.SORT_CLEAR);
    setIsReverse(SortType.SORT_CLEAR);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': isLight !== SortType.SORT_ALPHABET,
          })}
          onClick={() => setIsLight(SortType.SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': isLight !== SortType.SORT_LENGTH,
          })}
          onClick={() => setIsLight(SortType.SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': isReverse !== SortType.SORT_REVERSE,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(isLight || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
