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
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  const [reverse, setReverse] = useState(false);
  const [type, setType] = useState(SortType.NONE);

  const visibleGoods = [...goodsFromServer];

  const reset = () => {
    setReverse(false);
    setType(SortType.NONE);
  };

  visibleGoods.sort((good1, good2) => {
    switch (type) {
      case SortType.ALPHABET:
        return good1.localeCompare(good2);

      case SortType.LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (reverse) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setType(SortType.ALPHABET)}
          type="button"
          className={cn('button is-info', {
            'is-light': type !== SortType.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setType(SortType.LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': type !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => (setReverse(!reverse))}
          type="button"
          className={cn('button is-warning', { 'is-light': !reverse })}
        >
          Reverse
        </button>

        {(reverse || type !== SortType.NONE) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li key={good} data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
