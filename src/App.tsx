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
  Name = 'name',
  Length = 'length',
  Default = '',
}

export const App: React.FC = () => {
  const preparedGoods = [...goodsFromServer];
  const [sortType, setSortState] = useState(SortType.Default);
  const [isReversed, setIsReserve] = useState(false);

  preparedGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.Length:
        return good1.length - good2.length;
      case SortType.Name:
        return good1.localeCompare(good2);
      default:
        return 0;
    }
  });

  if (isReversed) {
    preparedGoods.reverse();
  }

  const getButtonClass = (buttonType: string) => {
    return sortType === buttonType ? '' : 'is-light';
  };

  const reset = () => {
    setIsReserve(false);
    setSortState(SortType.Default);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortState(SortType.Name)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': getButtonClass(SortType.Name),
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortState(SortType.Length)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': getButtonClass(SortType.Length),
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReserve(!isReversed)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>
        {(sortType || isReversed) && (
          <button
            onClick={() => {
              reset();
            }}
            type="button"
            className={cn('button', 'is-danger', {
              'is-light': getButtonClass('Reset'),
            })}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
