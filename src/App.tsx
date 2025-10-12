import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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
  Default,
  Alphabetically = 'Alphabetically',
  ByLength = 'ByLength',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [reverse, setReverse] = useState(false);

  const getPreparedGoods = () => {
    let preparedGoods = [...goodsFromServer];

    switch (sortType) {
      case SortType.Alphabetically:
        preparedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.ByLength:
        preparedGoods.sort((a, b) => a.length - b.length);
        break;
      case SortType.Default:
        break; 
    }

    if (reverse) {
      preparedGoods = preparedGoods.reverse();
    }

    return preparedGoods;
  };

  const goodsList = getPreparedGoods();
  const isChanged = sortType !== SortType.Default || reverse;

  const resetSort = () => {
    setSortType(SortType.Default);
    setReverse(false);
  };

  const toggleReverse = () => setReverse(prev => !prev);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.Alphabetically,
          })}
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>


        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.ByLength,
          })}
          onClick={() => setSortType(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className={cn('button is-danger', {
              'is-light': !(sortType !== SortType.Default || reverse),
            })}
            onClick={resetSort}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
