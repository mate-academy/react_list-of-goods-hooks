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

interface FilterParams {
  sortField: SortField | '';
  reverseOrder: boolean;
}

enum SortField {
  Alphabetically = 'Sort alphabetically',
  ByLength = 'Sort by length',
}

function getPrepearedGoods(goods: string[],
  { sortField, reverseOrder }: FilterParams) {
  let prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods = prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.Alphabetically:
          return good1.localeCompare(good2);

        case SortField.ByLength:
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
  const [sortField, setSortField] = useState<SortField | ''>('');
  const [isOrderReversed, setIsOrderReversed] = useState(false);
  const visibleGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    reverseOrder: isOrderReversed,
  });

  const handleSort = (sort: SortField) => () => setSortField(sort);

  const handleReset = () => {
    setSortField('');
    setIsOrderReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortField.Alphabetically,
          })}
          onClick={handleSort(SortField.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortField.ByLength,
          })}
          onClick={handleSort(SortField.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isOrderReversed,
          })}
          onClick={() => setIsOrderReversed(!isOrderReversed)}
        >
          Reverse
        </button>

        {sortField || isOrderReversed ? (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        ) : null}
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
