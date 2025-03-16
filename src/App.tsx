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
  NONE = '',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const getSortedGoods = () => {
    const sortedGoods = [...goodsFromServer];

    if (sortField === SortType.ALPHABET) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortField === SortType.LENGTH) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    return isReversed ? sortedGoods.reverse() : sortedGoods;
  };

  const visibleGoods = getSortedGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.ALPHABET)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.ALPHABET,
            'is-active': sortField === SortType.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.LENGTH,
            'is-active': sortField === SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
            'is-active': isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField !== SortType.NONE || isReversed) && (
          <button
            onClick={() => {
              setSortField(SortType.NONE);
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
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
