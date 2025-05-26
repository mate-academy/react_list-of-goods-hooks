import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

type SortType = 'alphabet' | 'length' | null;

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

export const App = () => {
  const [sortType, setSortType] = useState<SortType>(null);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const getPreparedGoods = (): string[] => {
    const sortedGoods = [...goodsFromServer];

    if (sortType === 'alphabet') {
      sortedGoods.sort();
    } else if (sortType === 'length') {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const handleAlphabetSort = (): void => setSortType('alphabet');
  const handleLengthSort = (): void => setSortType('length');
  const handleReverse = (): void => setIsReversed(prev => !prev);
  const handleReset = (): void => {
    setSortType(null);
    setIsReversed(false);
  };

  const preparedGoods = getPreparedGoods();
  const isInitialOrder = !sortType && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== 'alphabet',
          })}
          onClick={handleAlphabetSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== 'length',
          })}
          onClick={handleLengthSort}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map((good: string) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
