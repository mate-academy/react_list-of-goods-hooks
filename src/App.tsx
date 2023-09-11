import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import cn from 'classnames';

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
];

enum SortType {
  sort_abc = 'alphabet',
  sort_length = 'length',
}

function getVisibleGoods(sortType: string, isReversed: boolean) {
  const visibleGoods: string[] = [...goodsFromServer];

  switch (sortType) {
    case SortType.sort_abc:
      visibleGoods
        .sort((good1: string, good2: string) => good1.localeCompare(good2));
      break;
    case SortType.sort_length:
      visibleGoods
        .sort((good1: string, good2: string) => good1.length - good2.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const reset = () => {
    setSortType('');
    setIsReversed(false);
  };

  const isResetShown: string | boolean = sortType || isReversed;
  const visibleGoods: string[] = getVisibleGoods(sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.sort_abc},
          )}
          onClick={() => setSortType(SortType.sort_abc)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.sort_length },
          )}
          onClick={() => setSortType(SortType.sort_length)}
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

        {isResetShown && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
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
