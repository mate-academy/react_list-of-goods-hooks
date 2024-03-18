import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

export const goodsFromServer: string[] = [
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

const CLASS_IS_LIGHT = 'is-light';

enum SortType {
  BY_ALPHABET = 'alphabet',
  BY_LENGTH = 'length',
  BY_DEFAULT = '',
}

type GetPreparedGoods = (
  goods: string[],
  sortField: string,
  isReversed: boolean,
) => string[];

const getPreparedGoods: GetPreparedGoods = (goods, sortField, isReversed) => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.BY_ALPHABET:
          return good1.localeCompare(good2);
        case SortType.BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.BY_DEFAULT);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);
  const reverseCondition = isReversed || sortField;
  const reset = () => {
    setSortField(SortType.BY_DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            [CLASS_IS_LIGHT]: sortField !== SortType.BY_ALPHABET,
          })}
          onClick={() => setSortField(SortType.BY_ALPHABET)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button is-success', {
            [CLASS_IS_LIGHT]: sortField !== SortType.BY_LENGTH,
          })}
          onClick={() => setSortField(SortType.BY_LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button is-warning', {
            [CLASS_IS_LIGHT]: !isReversed,
          })}
          onClick={() => setIsReversed(hasReversed => !hasReversed)}
        >
          Reverse
        </button>
        {reverseCondition && (
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
