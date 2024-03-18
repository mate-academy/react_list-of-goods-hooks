import React from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

type Good = string;
type Goods = Good[];

export const goodsFromServer: Goods = [
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

type SortField = '' | 'alphabet' | 'length';

interface SortOptions {
  sortField: SortField;
  isReverse: boolean;
}

function getSortedGoods(goods: Goods, { sortField, isReverse }: SortOptions) {
  const sortedGoods = [...goods];

  if (sortField) {
    sortedGoods.sort((a, b) => {
      switch (sortField) {
        case 'alphabet':
          return a.localeCompare(b);

        case 'length':
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = React.useState<SortField>('');
  const [isReverse, setIsReverse] = React.useState(false);

  const sortedGoods: Goods = getSortedGoods(goodsFromServer, {
    sortField,
    isReverse,
  });
  const isResetButtonVisible = isReverse || sortField;

  const handleReset = () => {
    setSortField('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== 'alphabet',
          })}
          onClick={() => {
            setSortField('alphabet');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== 'length',
          })}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>
        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleReset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
