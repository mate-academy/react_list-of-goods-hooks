import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

type Goods = string[];

interface FilterParams{
  sortField: string;
  isReversed: boolean;
}

enum SortType{
  Alphabet = 'alphabet',
  Length = 'length',
  NoSort = '',
}

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

function getPreparedGoods(
  goods: Goods,
  { sortField, isReversed }: FilterParams,
) {
  let allGoods;

  switch (sortField) {
    case SortType.Alphabet:
      allGoods = [...goods].sort();
      break;
    case SortType.Length:
      allGoods = [...goods].sort((good1, good2) => good1.length - good2.length);
      break;
    case SortType.NoSort:
    default:
      allGoods = [...goods];
      break;
  }

  if (isReversed) {
    allGoods.reverse();
  }

  return allGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const handleSort = (field: SortType) => () => setSortField(field);

  const handleReverse = () => setIsReversed(!isReversed);

  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
          onClick={handleSort(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={handleSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
