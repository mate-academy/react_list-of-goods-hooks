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

type SortBy = 'abc' | 'length' | '';

type FilterParams = {
  soryBy: SortBy,
  reverse: boolean,
};

function prepareGoods(
  initialGoods: string[],
  { soryBy, reverse }: FilterParams,
) {
  const preparedGoods = [...initialGoods];

  if (soryBy) {
    preparedGoods.sort((good1, good2) => {
      switch (soryBy) {
        case 'abc':
          return good1.localeCompare(good2);

        case 'length':
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return reverse ? preparedGoods.reverse() : preparedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortBy>('');
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods = prepareGoods(
    goodsFromServer,
    { soryBy: sortBy, reverse: isReverse },
  )
    || goodsFromServer;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== 'abc',
          })}
          onClick={() => setSortBy('abc')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== 'length',
          })}
          onClick={() => setSortBy('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(prev => !prev)}
        >
          Reverse
        </button>

        {(sortBy || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy('');
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={visibleGoods.indexOf(good)}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
