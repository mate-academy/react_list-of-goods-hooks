import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

type Post = string;

enum SortType {
  letter = 'letter',
  length = 'length',
  none = ''
};


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
    case SortType.letter:
      sortedGoods.sort((item1, item2) => item1.localeCompare(item2));
      break;
    case SortType.length:
      sortedGoods.sort((item1, item2) => item1.length - item2.length);
      break;
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [sortingProperties, setSortingProperty] = useState<SortType>(SortType.none);
  const [reverseSorting, setReverseSorting] = useState(false);
  let goods: Post[] = [...goodsFromServer];

  if (sortingProperties) {
    goods = sortingBy(goods, sortingProperties);
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
            'is-light': sortingProperties !== SortType.letter,
          })}
          onClick={() => setSortingProperty(SortType.letter)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortingProperties !== SortType.length,
          })}
          onClick={() => setSortingProperty(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reverseSorting !== true,
          })}
          onClick={() => setReverseSorting(!reverseSorting)}
        >
          Reverse
        </button>

        {(sortingProperties || reverseSorting) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortingProperty(SortType.none);
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
