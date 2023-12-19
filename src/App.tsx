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

enum SortType {
  byAbc = 'abc',
  byLength = 'length',
}

interface FilterProps {
  sortField: string,
  isReversed: boolean,
}

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: FilterProps,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.byAbc:
          return good1.localeCompare(good2);
        case SortType.byLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField, isReversed,
  });

  const isChanged = sortField !== '' || isReversed;

  const onReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.byAbc,
          })}
          onClick={() => {
            setSortField(SortType.byAbc);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.byLength,
          })}
          onClick={() => {
            setSortField(SortType.byLength);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(item => (
          <li
            data-cy="Good"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
