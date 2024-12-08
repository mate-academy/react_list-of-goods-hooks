import React, { useState } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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
  ALPHABET = 'Sort alphabetically',
  LENGTH = 'Sort by length',
  DEFAULT = '',
}

interface SortState {
  type: SortType;
  reversed: boolean;
}

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState<string[]>(goodsFromServer);
  const [sort, setSort] = useState<SortState>({
    type: SortType.DEFAULT,
    reversed: false,
  });

  const handleSort = (type: SortType): void => {
    const cloneGoodsForSort = [...goodsFromServer];

    if (type === SortType.ALPHABET) {
      cloneGoodsForSort.sort((a, b) => a.localeCompare(b));
    } else if (type === SortType.LENGTH) {
      cloneGoodsForSort.sort((a, b) => a.length - b.length);
    }

    if (sort.reversed) {
      cloneGoodsForSort.reverse();
    }

    setSort({ type, reversed: sort.reversed });
    setVisibleGoods(cloneGoodsForSort);
  };

  const handleButton = (): void => {
    const cloneForReverse = [...visibleGoods];

    cloneForReverse.reverse();
    setSort(prev => ({ ...prev, reversed: !sort.reversed }));
    setVisibleGoods(cloneForReverse);
  };

  const handleReset = () => {
    setVisibleGoods(goodsFromServer);
    setSort({ type: SortType.DEFAULT, reversed: false });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-success ${sort.type === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sort.type === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sort.reversed ? '' : 'is-light'}`}
          onClick={handleButton}
        >
          Reverse
        </button>

        {sort.type !== SortType.DEFAULT || sort.reversed === true ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
