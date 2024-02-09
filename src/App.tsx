import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

type Post = string;

enum SortType {
  alphabetical = 'letter',
  length = 'length',
  none = '',
}

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

const sortingBy = (goods: Post[], property: SortType): Post[] => {
  const sortedGoods = [...goods];

  switch (property) {
    case SortType.alphabetical:
      sortedGoods.sort((item1, item2) => item1.localeCompare(item2));
      break;
    case SortType.length:
      sortedGoods.sort((item1, item2) => item1.length - item2.length);
      break;
    default:
      return sortedGoods;
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.none);
  const [reverseSorting, setReverseSorting] = useState(false);
  let goods: Post[] = [...goodsFromServer];

  if (sortBy) {
    goods = sortingBy(goods, sortBy);
  }

  if (reverseSorting) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortType.alphabetical,
          })}
          onClick={() => setSortBy(SortType.alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SortType.length,
          })}
          onClick={() => setSortBy(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverseSorting,
          })}
          onClick={() => setReverseSorting(!reverseSorting)}
        >
          Reverse
        </button>

        {(sortBy || reverseSorting) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.none);
              setReverseSorting(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
