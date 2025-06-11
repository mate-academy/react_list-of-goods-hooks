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
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType;
  isReversed: boolean;
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log('getReorderedGoods', { sortType, isReversed, visibleGoods });

  return visibleGoods;
}

export const App: React.FC = () => {
  const [reorderOptions, setReorderOptions] = useState<ReorderOptions>({
    sortType: SortType.NONE,
    isReversed: false,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${reorderOptions.sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={() =>
            setReorderOptions(prev => ({
              ...prev,
              sortType: SortType.ALPHABET,
            }))
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${reorderOptions.sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() =>
            setReorderOptions(prev => ({
              ...prev,
              sortType: SortType.LENGTH,
            }))
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${
            reorderOptions.isReversed ? '' : 'is-light'
          }`}
          onClick={() =>
            setReorderOptions(prev => ({
              ...prev,
              isReversed: !prev.isReversed,
            }))
          }
        >
          Reverse
        </button>

        {(reorderOptions.sortType !== SortType.NONE ||
          reorderOptions.isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() =>
              setReorderOptions({
                sortType: SortType.NONE,
                isReversed: false,
              })
            }
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getReorderedGoods(goodsFromServer, reorderOptions).map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
