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

enum SortField {
  All = '',
  Alphabet = 'alphabet',
  Length = 'length',
} 

interface SortOptions {
  sortField: SortField;
  isReverse: boolean;
};

function getSortedGoods(goods: Goods, { sortField, isReverse }: SortOptions) {
  const sortedGoods = [...goods];

  if (sortField) {
    sortedGoods.sort((a, b) => {
      switch (sortField) {
        case SortField.Alphabet:
          return a.localeCompare(b);

        case SortField.Length:
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
  const [sortField, setSortField] = React.useState<SortField>(SortField.All);
  const [isReverse, setIsReverse] = React.useState(false);

  const sortedGoods: Goods = getSortedGoods(goodsFromServer, {
    sortField,
    isReverse,
  });
  const isChanged: boolean = isReverse || sortField !== '';

  const resetOnClick = () => {
    setSortField(SortField.All);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortField.Alphabet,
          })}
          onClick={() => {
            setSortField(SortField.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortField.Length,
          })}
          onClick={() => setSortField(SortField.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse((isReverse) => !isReverse)}
        >
          Reverse
        </button>
        {isChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => resetOnClick()}
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
