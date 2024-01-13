import React, { useState, useMemo } from 'react';
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
  alphabet = 'by alphabet',
  length = 'by length',
  none = '',
}

type OrderMethods = {
  sortMethod: SortType;
  reverse: boolean;
};

function getSorted(goods: string[], { sortMethod, reverse }: OrderMethods) {
  const copyOfGoods = [...goods];

  if (sortMethod) {
    copyOfGoods.sort((good1, good2) => {
      switch (sortMethod) {
        case SortType.alphabet:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    return copyOfGoods.reverse();
  }

  return copyOfGoods;
}

export const App: React.FC = () => {
  const [sortMethod, setSortMethod] = useState(SortType.none);
  const [reverse, setReverse] = useState(false);

  const reset = () => {
    setSortMethod(SortType.none);
    setReverse(false);
  };

  const getReverse = () => {
    setReverse(!reverse);
  };

  const sortedGoods = useMemo(() => getSorted(
    goodsFromServer, { sortMethod, reverse },
  ), [sortMethod, reverse]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortMethod(SortType.alphabet)}
          className={cn('button is-info',
            { 'is-light': sortMethod !== SortType.alphabet })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortMethod(SortType.length)}
          className={cn('button is-success',
            { 'is-light': sortMethod !== SortType.length })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={getReverse}
          className={cn('button is-warning',
            { 'is-light': !reverse })}
        >
          Reverse
        </button>

        {(sortMethod || reverse) && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
