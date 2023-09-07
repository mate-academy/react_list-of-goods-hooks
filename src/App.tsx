import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
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

interface Params {
  sortField: SortType[keyof SortType],
  reverseField: ReverseType[keyof ReverseType],
}

enum SortType {
  alphabet = 'alphabet',
  length = 'length',
  empty = '',
}

enum ReverseType {
  reverse = 'reverse',
  empty = '',
}

function getPreparedGoods(
  goods: string[], { sortField, reverseField }: Params,
): string[] {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.alphabet:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

function resetField(field: (param: string) => void) {
  field('');
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState('');

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, reverseField },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.alphabet,
          })}
          onClick={() => setSortField(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reverseField !== ReverseType.reverse,
          })}
          onClick={() => setReverseField(
            reverseField === ReverseType.reverse
              ? ReverseType.empty
              : ReverseType.reverse,
          )}
        >
          Reverse
        </button>

        {
          (sortField || reverseField) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                resetField(setSortField);
                resetField(setReverseField);
              }}
            >
              Reset
            </button>
          )
        }

      </div>

      <ul>
        {
          visibleGoods.map(good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
