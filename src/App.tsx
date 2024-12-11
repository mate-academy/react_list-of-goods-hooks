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
  SORT_OFF = '',
  SORT_ABC = 'abc',
  SORT_BY_LENGTH = 'leng',
}

function getGoodsView(sortField: SortType, reverse: boolean) {
  let prepearedGoods = [...goodsFromServer];

  switch (sortField) {
    case SortType.SORT_ABC:
      prepearedGoods = prepearedGoods.sort((cur, prew) => {
        return reverse ? prew.localeCompare(cur) : cur.localeCompare(prew);
      });
      break;
    case SortType.SORT_BY_LENGTH:
      prepearedGoods = reverse
        ? prepearedGoods.sort((a, b) => a.length - b.length).reverse()
        : prepearedGoods.sort((a, b) => a.length - b.length);
      break;
    case SortType.SORT_OFF:
      prepearedGoods = reverse
        ? prepearedGoods.reverse()
        : [...goodsFromServer];
      break;
    default:
      prepearedGoods = [...goodsFromServer];
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.SORT_OFF);
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getGoodsView(sortField, reverse);

  const sortGoods = (sorting: SortType, reversing = false) => {
    setReverse(reversing);
    setSortField(sorting);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_ABC,
          })}
          onClick={() => sortGoods(SortType.SORT_ABC, reverse)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => sortGoods(SortType.SORT_BY_LENGTH, reverse)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => sortGoods(sortField, !reverse)}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
            onClick={() => sortGoods(SortType.SORT_OFF, false)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(el => (
          <li data-cy="Good" key={el}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};
