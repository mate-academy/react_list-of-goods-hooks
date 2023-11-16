import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

// export const goodsFromServer = [
//   'Dumplings',
//   'Carrot',
//   'Eggs',
//   'Ice cream',
//   'Apple',
//   'Bread',
//   'Fish',
//   'Honey',
//   'Jam',
//   'Garlic',
// ];

enum GoodsFromServer {
  Dumplings = 'Dumplings',
  Carrot = 'Carrot',
  Eggs = 'Eggs',
  IceCream = 'Ice cream',
  Apple = 'Apple',
  Bread = 'Bread',
  Fish = 'Fish',
  Honey = 'Honey',
  Jam = 'Jam',
  Garlic = 'Garlic',
}

interface SortOptions {
  activeSort: 'alphabetically' | 'length' | 'reset';
  isReversed: boolean;
}

const handleSort = (goods: GoodsFromServer[], options: SortOptions) => {
  const preparedGoods = [...goods];

  preparedGoods.sort((a, b) => {
    switch (options.activeSort) {
      case 'alphabetically':
        return a.localeCompare(b);

      case 'length':

        return a.length - b.length;

      default:
        return 0;
    }
  });

  if (options.isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [activeSort, setActiveSort]
    = useState<SortOptions['activeSort'] | null>(null);

  const [isReversed, setIsReversed]
    = useState<SortOptions['isReversed']>(false);

  const visibleGoods = handleSort(Object.values(GoodsFromServer), {
    activeSort: activeSort || 'alphabetically',
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeSort === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => setActiveSort('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeSort === 'length' ? '' : 'is-light'}`}
          onClick={() => setActiveSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(true)}
        >
          Reverse
        </button>

        {activeSort || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setActiveSort(null);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
