import React, { useState } from 'react';
import cn from 'classnames';

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

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState<number>(SortType.NONE);

  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const getReorderedGoods = (goods: string[]) => {
    const visibleGoods = [...goods];

    visibleGoods.sort((gA, gB) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return gA.localeCompare(gB);
        case SortType.LENGTH:
          return gA.length - gB.length;
        default:
          return 0;
      }
    });

    if (isReversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed !== true,
          })}
          onClick={() => setIsReversed(currState => !currState)}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE)
            && (
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
        <ul>
          {getReorderedGoods(goodsFromServer).map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
