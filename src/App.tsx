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
  alphabet = 'alphabet',
  length = 'length',
  revers = 'revers',
}

function getParameterGood(goods: string[], type: SortType): string[] {
  const soretedGoods = [...goods];

  if (type === SortType.alphabet) {
    return soretedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (type === SortType.length) {
    return soretedGoods.sort((a, b) => a.length - b.length);
  }

  if (type === SortType.revers) {
    return soretedGoods.reverse();
  }

  return [];
}

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState<string[]>(goodsFromServer);
  const [sortType, setSortType] = useState<SortType | null>(null);

  function useSorted(type: SortType) {
    setSortType(type);

    return setVisibleGoods(getParameterGood(goodsFromServer, type));
  }

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setSortType(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={useSorted(SortType.alphabet)}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortType !== SortType.alphabet })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={useSorted(SortType.length)}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortType !== SortType.length })}
        >
          Sort by length
        </button>

        <button
          onClick={useSorted(SortType.revers)}
          type="button"
          className={cn('button is-warning', { 'is-light': SortType.revers })}
        >
          Reverse
        </button>

        {visibleGoods && (
          <button
            onClick={reset}
            type="button"
            className="is-danger is-light button"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
