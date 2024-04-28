import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

const SORT_FIELD_ABC = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

export const App: React.FC = () => {
  const [currentSort, setCurrentSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const getPreparedGoods = () => {
    const preparedGoods = [...goodsFromServer];

    if (currentSort) {
      preparedGoods.sort((a, b) => {
        if (currentSort === SORT_FIELD_ABC) {
          return a.localeCompare(b);
        }

        if (currentSort === SORT_FIELD_LENGTH) {
          return a.length - b.length;
        }

        return 0;
      });
    }

    if (isReversed) {
      preparedGoods.reverse();
    }

    return preparedGoods;
  };

  const handleSort = (sortField: string) => {
    setCurrentSort(sortField);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setCurrentSort('');
    setIsReversed(false);
  };

  const visibleGoods = getPreparedGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSort(SORT_FIELD_ABC)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': currentSort !== SORT_FIELD_ABC,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSort(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': currentSort !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {(currentSort || isReversed) && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
