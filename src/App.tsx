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

enum SortField {
  length = 'length',
  alphabet = 'alphabet',
  default = 0,
}

interface SortFieldAndIsReversed {
  sortField: SortField | string;
  isReversed: boolean;
}

function getGoodsPrepared(
  goods: string[],
  { sortField, isReversed }: SortFieldAndIsReversed,
) {
  let preparedGoods = [...goods];

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.length:
          if (isReversed) {
            return good2.length - good1.length;
          }

          return good1.length - good2.length;

        case SortField.alphabet:
          if (isReversed) {
            return good2.localeCompare(good1);
          }

          return good1.localeCompare(good2);

        default:
          return SortField.default;
      }
    });
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getGoodsPrepared(goodsFromServer, {
    sortField,
    isReversed,
  });

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortField.alphabet,
          })}
          onClick={() => setSortField(SortField.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortField.length,
          })}
          onClick={() => setSortField(SortField.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed === false,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
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
