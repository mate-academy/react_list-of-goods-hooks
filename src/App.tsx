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
  Alphabetically,
  Length,
  Reset,
}

export function sortGoods(
  goods: string[],
  type: SortType,
  reverse: boolean,
): string[] {
  const preparedGoods = [...goods];

  switch (type) {
    case SortType.Alphabetically:
      preparedGoods.sort((goodA, goodB) => goodA.localeCompare(goodB));
      break;
    case SortType.Length:
      preparedGoods.sort((goodA, goodB) => goodA.length - goodB.length);
      break;
    default:
      break;
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sort, setSort] = useState<SortType | null>(null);
  const [reverse, setReverse] = useState<boolean>(false);

  const handleSort = (type: SortType) => {
    const sortedGoods = sortGoods(goodsFromServer, type, reverse);

    setSort(type);
    setGoods(sortedGoods);
  };

  const handleReverse = () => {
    const newReverse = !reverse;
    const sortedGoods = sortGoods(
      goodsFromServer,
      sort ?? SortType.Reset,
      newReverse,
    );

    setReverse(newReverse);
    setGoods(sortedGoods);
  };

  const handleReset = () => {
    setGoods(goodsFromServer);
    setSort(null);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => handleSort(SortType.Alphabetically)}
          className={cn('button is-info', {
            'is-light': sort !== SortType.Alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => handleSort(SortType.Length)}
          className={cn('button is-success', {
            'is-light': sort !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={cn('button is-warning', { 'is-light': !reverse })}
        >
          Reverse
        </button>

        {(sort !== null || reverse) && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger is-light"
          >
            Reset
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
