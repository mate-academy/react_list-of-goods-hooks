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
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  DEFAULT = '',
}

function getVisibleGoods(
  goods: string[],
  sortField: SortType,
  toReverse: boolean,
) {
  const visibleGoods = [...goods];

  if (sortField) {
    visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (toReverse) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [isReversed, setReversedField] = useState(false);

  const visibleGoods = getVisibleGoods(
    goodsFromServer, sortField, isReversed,
  );

  const handleResetClick = () => {
    setSortField(SortType.DEFAULT);
    setReversedField(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SortType.ALPHABET })}
          onClick={() => setSortField(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SortType.LENGTH })}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': !isReversed })}
          onClick={() => setReversedField(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetClick}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul className="list">
          {visibleGoods.map(good => (
            <li className="item" key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
