import React, { useState } from 'react';
import cn from 'classnames';
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
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goodsFromServer];

  visibleGoods.sort((a, b) => {
    if (sortType === SortType.ALPHABET) {
      return a.localeCompare(b);
    }

    if (sortType === SortType.LENGTH) {
      return a.length - b.length;
    }

    return 0;
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReverseField] = useState(false);

  const handleReset = () => {
    setSortType(SortType.NONE);
    setReverseField(false);
  };

  const reorderedGoods = getReorderedGoods({ sortType, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            'button is-info': true,
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            'button is-success': true,
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            'button is-warning': true,
            'is-light': isReversed !== true,
          })}
          onClick={() => setReverseField(Reversed => !Reversed)}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => handleReset()}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {reorderedGoods.map(item => {
          return (
            <li key={item} data-cy="Good">{item}</li>
          );
        })}
      </ul>
    </div>
  );
};
