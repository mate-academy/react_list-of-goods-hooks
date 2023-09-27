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

interface FilterParems {
  sortField: string;
  reverseOrder: boolean;
}

function getPrepearedGoods(goods: string[],
  { sortField, reverseOrder }: FilterParems) {
  let prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods = prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'Sort alphabetically':
          return good1.localeCompare(good2);

        case 'Sort by length':
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseOrder) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isOrderReverser, setIsOrderReversed] = useState(false);
  const visibleGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    reverseOrder: isOrderReverser,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== 'Sort alphabetically',
          })}
          onClick={() => {
            setSortField('Sort alphabetically');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== 'Sort by length',
          })}
          onClick={() => {
            setSortField('Sort by length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isOrderReverser,
          })}
          onClick={() => setIsOrderReversed(!isOrderReverser)}
        >
          Reverse
        </button>

        {sortField || isOrderReverser ? (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortField('');
              setIsOrderReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
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
