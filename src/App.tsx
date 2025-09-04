import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

enum SortType {
  None = 'None',
  Alphabetically = 'Alphabetically',
  ByLength = 'ByLength',
}

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

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);

  const [reverse, setReverse] = useState<boolean>(false);

  const getVisibleGoods = (): string[] => {
    const result = [...goodsFromServer];

    if (sortType === SortType.Alphabetically) {
      result.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SortType.ByLength) {
      result.sort((a, b) => a.length - b.length);
    }

    if (reverse) {
      result.reverse();
    }

    return result;
  };

  const visibleGoods = getVisibleGoods();

  const handleSortChange = (type: SortType) => {
    setSortType(type);
  };

  const handleReverseToggle = () => {
    setReverse(prev => !prev);
  };

  const handleReset = () => {
    setSortType(SortType.None);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.Alphabetically,
          })}
          onClick={() => handleSortChange(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.ByLength,
          })}
          onClick={() => handleSortChange(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={handleReverseToggle}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || reverse) && (
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
