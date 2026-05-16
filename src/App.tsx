import React, { useState } from 'react';
import cn from 'classnames';
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

enum SortType {
  None = '',
  Alphabetically = 'alphabetically',
  ByLength = 'by length',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [reverse, setReverse] = useState(false);

  const visibleGoods = [...goodsFromServer];

  if (sortField) {
    visibleGoods.sort((goodA, goodB) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return goodA.localeCompare(goodB);
        case SortType.ByLength:
          return goodA.length - goodB.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    visibleGoods.reverse();
  }

  const sortFields: SortType[] = [SortType.Alphabetically, SortType.ByLength];

  return (
    <div className="section content">
      <div className="buttons">
        {sortFields.map(field => (
          <button
            key={field}
            type="button"
            className={cn('button', {
              'is-info': field === SortType.Alphabetically,
              'is-light': field !== sortField,
              'is-success': field === SortType.ByLength,
            })}
            onClick={() => setSortField(field)}
          >
            Sort {field}
          </button>
        ))}

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(prev => !prev)}
        >
          Reverse
        </button>
        {(sortField !== SortType.None || reverse) && (
          <button
            type="button"
            className={cn('button', 'is-danger')}
            onClick={() => (setSortField(SortType.None), setReverse(false))}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
