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

const CLASS_IS_LIGHT = 'is-light';

enum SortType {
  SORT_BY_ALPHABET = 'alphabet',
  SORT_BY_LENGTH = 'length',
}

type GetPreparedGoods = (
  goods: string[],
  sortField: string,
  reversed: boolean,
) => string[];

const getPreparedGoods: GetPreparedGoods = (goods, sortField, reversed) => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_BY_ALPHABET:
          return good1.localeCompare(good2);
        case SortType.SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, isReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, reversed);
  const reverseCondition = reversed || sortField;
  const reset = () => {
    setSortField('');
    isReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            [CLASS_IS_LIGHT]: sortField !== SortType.SORT_BY_ALPHABET,
          })}
          onClick={() => setSortField(SortType.SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button is-success', {
            [CLASS_IS_LIGHT]: sortField !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button is-warning', {
            [CLASS_IS_LIGHT]: !reversed,
          })}
          onClick={() => isReversed(hasReversed => !hasReversed)}
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
