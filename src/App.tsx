import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';

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

enum SortOptions {
  SORT_BY_ALPHABET = 'alphabet',
  SORT_BY_LENGTH = 'length',
}

function prepareGoods(sortType: SortOptions | '', reverse: boolean) {
  const goods = [...goodsFromServer];

  goods.sort((good1, good2) => {
    switch (sortType) {
      case SortOptions.SORT_BY_ALPHABET:
        return good1.localeCompare(good2);

      case SortOptions.SORT_BY_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reverse) {
    goods.reverse();
  }

  return goods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortOptions | ''>('');
  const [isReversed, setIsReversed] = useState(false);
  const goods = prepareGoods(sortType, isReversed);
  const showResetButton = isReversed || sortType;

  const reset = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortOptions.SORT_BY_ALPHABET,
          })}
          onClick={() => {
            setSortType(SortOptions.SORT_BY_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortOptions.SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortType(SortOptions.SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>
        {showResetButton && (
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
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
