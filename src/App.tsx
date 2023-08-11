import React from 'react';
import 'bulma/css/bulma.css';
import { useState } from 'react';
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

enum sortType {
  alphabetically = 'Sort alphabetically',
  byLength = 'Sort by length',
}

type Props = {
  sortField: string;
  toReverse: boolean
}

const getPreparedGoods = (goods: string[], { sortField, toReverse }: Props): string[] => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case sortType.alphabetically:
          return good1.localeCompare(good2);

        case sortType.byLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (toReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [toReverse, setToReverse] = useState(false);
  const visibleGoods
    = getPreparedGoods(goodsFromServer, { sortField, toReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(sortType.alphabetically)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== sortType.alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(sortType.byLength)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== sortType.byLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            if (toReverse === false) {
              setToReverse(true);
            } else {
              setToReverse(false);
            }
          }}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': toReverse === false,
          })}
        >
          Reverse
        </button>

        {
          sortField || toReverse
            ? (
              <button
                onClick={() => {
                  setSortField('');
                  setToReverse(false);
                }}
                type="button"
                className="button is-danger is-light"
              >
                Reset
              </button>
            )
            : ''
        }
      </div>

      <ul>
        {visibleGoods.map(good => (<li data-cy="Good" key={good}>{good}</li>))}
      </ul>
    </div>
  );
};
