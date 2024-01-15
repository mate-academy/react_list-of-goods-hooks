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

enum SortString {
  Alphabet = 'alphabet',
  Length = 'length',
}

function getPreparedGoods(
  goods: string[],
  sortField: string,
  isReverse: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortString.Alphabet:
          return good1.localeCompare(good2);

        case SortString.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setsortField] = useState('');
  const [isReverse, setisReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setsortField(SortString.Alphabet);
          }}
          type="button"
          className={`button is-info ${cn({
            'is-light': sortField !== SortString.Alphabet,
          })}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setsortField(SortString.Length);
          }}
          type="button"
          className={`button is-success ${cn({
            'is-light': sortField !== SortString.Length,
          })}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setisReverse((currentState) => !currentState);
          }}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
          <button
            onClick={() => {
              setsortField('');
              setisReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
