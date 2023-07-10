import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';

import './App.scss';

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

interface SortParams {
  sortField: string,
  isReverse: boolean,
}

enum SortField {
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  DEFAULT = '',
}

function getPreperedGoods(
  goods: string[],
  { sortField, isReverse }: SortParams,
): string[] {
  const preperedGoods = [...goods];

  if (sortField) {
    preperedGoods.sort((goodA, goodB) => {
      switch (sortField) {
        case SortField.ALPHABET:
          return goodA.localeCompare(goodB);
        case SortField.LENGTH:
          return goodA.length - goodB.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>(SortField.DEFAULT);
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const showResetButton = isReverse || sortField;

  const goods = getPreperedGoods(goodsFromServer, { sortField, isReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', {
            'is-light': sortField !== SortField.ALPHABET,
            'is-info': sortField === SortField.ALPHABET,
          })}
          onClick={() => {
            setSortField(SortField.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', {
            'is-light': sortField !== SortField.LENGTH,
            'is-success': sortField === SortField.LENGTH,
          })}
          onClick={() => setSortField(SortField.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', {
            'is-light': !isReverse,
            'is-warning': isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>
        {
          showResetButton && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortField(SortField.DEFAULT);
                setIsReverse(false);
              }}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {goods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
