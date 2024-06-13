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
  Alphabet = 'alphabet',
  Length = 'length',
}

type Filter = {
  sortField: SortType | '';
  reversed: boolean;
};

const sortGoodsBy = (goods: string[], { sortField, reversed }: Filter) => {
  const copyGoods = [...goods];

  switch (sortField) {
    case SortType.Alphabet:
      copyGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.Length:
      copyGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reversed) {
    copyGoods.reverse();
  }

  return copyGoods;
};

export const App: React.FC = () => {
  const [filter, setFilter] = useState<Filter>({
    sortField: '',
    reversed: false,
  });

  const sortedGoods = sortGoodsBy(goodsFromServer, filter);

  const reset = () => {
    setFilter({ sortField: '', reversed: false });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setFilter({ ...filter, sortField: SortType.Alphabet })}
          type="button"
          className={cn('button is-info', {
            'is-light': filter.sortField !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setFilter({ ...filter, sortField: SortType.Length })}
          type="button"
          className={cn('button is-success', {
            'is-light': filter.sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setFilter({ ...filter, reversed: !filter.reversed })}
          type="button"
          className={cn('button is-warning ', {
            'is-light': !filter.reversed,
          })}
        >
          Reverse
        </button>

        {(filter.reversed || filter.sortField) && (
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
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
