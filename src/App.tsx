import React, { useState } from 'react';
import classNames from 'classnames';
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
  ALPHABET = 'Sort alphabetically',
  LENGTH = 'Sort by length',
  RESET = 'Reset',
}

const preparedGoods = [...goodsFromServer];

const getSortedGoods = (order: SortType, isReversed: boolean): string[] => {
  const sortedGoods = [...preparedGoods].sort((a, b) => {
    switch (order) {
      case SortType.ALPHABET:
        return a.localeCompare(b);
      case SortType.LENGTH:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  return isReversed ? sortedGoods.reverse() : sortedGoods;
};

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<SortType>(SortType.RESET);

  const handleSortOrderChange = (order: SortType) => {
    if (order === SortType.RESET) {
      setIsReversed(false);
    }

    setSortOrder(order);
  };

  const handleReverseGoods = () => {
    setIsReversed(prevState => !prevState);
  };

  const goods = getSortedGoods(sortOrder, isReversed);
  const isResetVisible = sortOrder !== SortType.RESET || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortOrder !== SortType.ALPHABET,
          })}
          onClick={() => handleSortOrderChange(SortType.ALPHABET)}
        >
          {SortType.ALPHABET}
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortOrder !== SortType.LENGTH,
          })}
          onClick={() => handleSortOrderChange(SortType.LENGTH)}
        >
          {SortType.LENGTH}
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverseGoods}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => handleSortOrderChange(SortType.RESET)}
          >
            {SortType.RESET}
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
