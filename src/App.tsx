import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort();
  } else if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC<{}> = () => {
  const [reorderOptions, setReorderOptions] = useState<ReorderOptions>({
    sortType: SortType.NONE,
    isReversed: false,
  });

  const sortAlphabetically = () => {
    setReorderOptions({
      sortType: SortType.ALPHABET,
      isReversed: false,
    });
  };

  const sortByLength = () => {
    setReorderOptions({
      sortType: SortType.LENGTH,
      isReversed: false,
    });
  };

  const sortReverse = () => {
    setReorderOptions({
      ...reorderOptions,
      isReversed: !reorderOptions.isReversed,
    });
  };

  const reset = () => {
    setReorderOptions({
      sortType: SortType.NONE,
      isReversed: false,
    });
  };

  const goods = getReorderedGoods(goodsFromServer, reorderOptions);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${reorderOptions.sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={`button is-success ${reorderOptions.sortType === SortType.LENGTH ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={sortReverse}
          className={`button is-warning ${reorderOptions.isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        <button
          type="button"
          onClick={reset}
          className={`button is-danger ${reorderOptions.sortType === SortType.NONE ? '' : 'is-light'}`}
        >
          Reset
        </button>
      </div>

      <ul>
        <ul>
          {goods.map((good) => (
            <li key={good} data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
