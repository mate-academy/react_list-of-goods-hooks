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
  byAlphabet = 'alphabet',
  byLength = 'length',
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType | ''>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const preparedGoods = [...goodsFromServer];

  switch (sortBy) {
    case SortType.byAlphabet:
      preparedGoods.sort((a, b) => {
        return a.localeCompare(b);
      });
      break;

    case SortType.byLength:
      preparedGoods.sort((a, b) => {
        return a.length - b.length;
      });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  const handleToggleIsReversed = () => {
    setIsReversed(prevState => !prevState);
  };

  const handleReset = () => {
    setIsReversed(false);
    setSortBy('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortType.byAlphabet,
          })}
          onClick={() => setSortBy(SortType.byAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SortType.byLength,
          })}
          onClick={() => setSortBy(SortType.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleToggleIsReversed}
        >
          Reverse
        </button>

        {(isReversed || sortBy !== '') && (
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
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
