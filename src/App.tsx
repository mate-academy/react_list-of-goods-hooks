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

enum SortType {
  alphabetically = 'Sort alphabetically',
  byLength = 'Sort by length',
}

type Props = {
  sortField: string;
  toReverse: boolean
};

const getPreparedGoods = (
  goods: string[],
  { sortField, toReverse }: Props,
): string[] => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.alphabetically:
          return good1.localeCompare(good2);

        case SortType.byLength:
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

  const getReversedGoods = () => {
    if (toReverse === false) {
      setToReverse(true);
    } else {
      setToReverse(false);
    }
  }

  const resetGoods = () => {
    setSortField('');
    setToReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.alphabetically)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.byLength)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.byLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={getReversedGoods}
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
                onClick={resetGoods}
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
