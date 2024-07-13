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
  Reverse,
  Reset,
}

export function sortGoods(
  goods: string[],
  type: SortType,
  reverse: boolean,
): string[] {
  return [...goods].sort((good1, good2) => {
    switch (type) {
      case SortType.Alphabetically:
        return reverse
          ? good1.localeCompare(good2)
          : good2.localeCompare(good1);
      case SortType.Length:
        return reverse
          ? good1.length - good2.length
          : good2.length - good1.length;
      default:
        return 0;
    }
  });
}

export function reverseGoods(goods: string[]): string[] {
  return [...goods].reverse();
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sort, setSort] = useState<string>('');
  const [reverse, setReverse] = useState<boolean>(true);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            setGoods(sortGoods(goods, SortType.Alphabetically, reverse));
            setSort('alphabet');
          }}
          className={cn('button is-info', { 'is-light': sort !== 'alphabet' })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => {
            setGoods(sortGoods(goods, SortType.Length, reverse));
            setSort('length');
          }}
          className={cn('button is-success', { 'is-light': sort !== 'length' })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
            setGoods(reverseGoods(goods));
            setReverse(!reverse);
          }}
          className={cn('button is-warning', { 'is-light': reverse })}
        >
          Reverse
        </button>

        {sort || !reverse ? (
          <button
            type="button"
            onClick={() => {
              setGoods(goodsFromServer);
              setSort('');
              setReverse(true);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {goods.map((good, index) => {
          return (
            <li key={index} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
