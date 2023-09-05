import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

type Good = string;

enum Sort {
  DEFAULT = '',
  ALPHABETICALLY = 'sort alphabetically',
  BY_LENGTH = 'sort by length',
}

export const goodsFromServer: Good[] = [
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

const getSortedGoods = (condition: Sort, isReversed: boolean) => {
  const goodsCopy = [...goodsFromServer];

  goodsCopy.sort((a, b) => {
    switch (condition) {
      case Sort.ALPHABETICALLY:
        return a.localeCompare(b);

      case Sort.BY_LENGTH:
        return a.length - b.length;

      default:
        return 0;
    }
  });

  return isReversed ? goodsCopy.reverse() : goodsCopy;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(Sort.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const goods: Good[] = getSortedGoods(sortField, isReversed);
  const showResetBtn = sortField || isReversed;

  const handleReset = () => {
    setIsReversed(false);
    setSortField(Sort.DEFAULT);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== Sort.ALPHABETICALLY },
          )}
          onClick={() => setSortField(Sort.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== Sort.BY_LENGTH },
          )}
          onClick={() => setSortField(Sort.BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {showResetBtn
          && (
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
        {goods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
