import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

const goodsFromServer: string[] = [
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
  None = '',
  Length = 'length',
  Alphabet = 'alphabet',
}

function getPreparedGoods(
  goods: string[],
  sortBy: SortType,
  isReverse: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((a: string, b: string): number => {
      switch (sortBy) {
        case SortType.Alphabet:
          return a.localeCompare(b);

        case SortType.Length:
          return b.length - a.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [reverse, setReverse] = useState<boolean>(false);
  const goods = getPreparedGoods(goodsFromServer, sortField, reverse);

  <ul>
    {goods.map((item: string) => (
      <li data-cy="Good" key={item}>
        {item}
      </li>
    ))}
  </ul>;

  const reset = () => {
    setSortField(SortType.None);
    setReverse(false);
  };

  const isGoodsModified = () => {
    return JSON.stringify(goods) !== JSON.stringify(goodsFromServer);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
          onClick={() => setSortField(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reverse !== true,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {isGoodsModified() && (
          <button
            type="button"
            className={cn('button is-danger', {
              'is-light': sortField !== SortType.None,
            })}
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
