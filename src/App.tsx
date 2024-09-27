import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortType } from './types/SortType';

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

const getPreparedGoods = (sortField: SortType, isReverse: boolean) => {
  const copyOfGoods = [...goodsFromServer];

  if (sortField) {
    copyOfGoods.sort((value1, value2) => {
      switch (sortField) {
        case SortType.alphabetically:
          return value1.localeCompare(value2);
        case SortType.length:
          return value1.length - value2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    copyOfGoods.reverse();
  }

  return copyOfGoods;
};

export const App: React.FC = () => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortField, setSorfield] = useState<SortType>(SortType.default);

  const handleChangeReverse = () => {
    setIsReverse(!isReverse);
  };

  const visibleGoods = getPreparedGoods(sortField, isReverse);

  const handleReset = () => {
    setSorfield(SortType.default);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', {
            'is-info': sortField === SortType.alphabetically,
            'is-light': sortField !== SortType.alphabetically,
          })}
          onClick={() => setSorfield(SortType.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', {
            'is-success': sortField === SortType.length,
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => setSorfield(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', {
            'is-warning': isReverse,
            'is-light': !isReverse,
          })}
          onClick={() => handleChangeReverse()}
        >
          Reverse
        </button>
        {(sortField || isReverse) && (
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
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
