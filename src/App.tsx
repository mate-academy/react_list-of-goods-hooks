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
  al = 'alphabetically',
  length = 'length',
  none = '',
}

function prepareGoods(goodsServer: string[], sort: SortType, reverse: boolean) {
  const goods = [...goodsServer];

  if (sort !== SortType.none) {
    goods.sort((good1, good2) => {
      switch (sort) {
        case SortType.al:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    goods.reverse();
  }

  return goods;
}

export const App = () => {
  const [sort, setSort] = useState(SortType.none);
  const [reverse, setReverse] = useState(false);

  const preparedGoods = prepareGoods(goodsFromServer, sort, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', { 'is-light': sort !== SortType.al })}
          onClick={() => setSort(SortType.al)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sort !== SortType.length,
          })}
          onClick={() => setSort(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reverse !== true,
          })}
          onClick={() =>
            reverse === true ? setReverse(false) : setReverse(true)
          }
        >
          Reverse
        </button>

        {sort !== '' || reverse !== false ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSort(SortType.none);
              setReverse(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {preparedGoods.map(good => (
          // eslint-disable-next-line react/jsx-key
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
