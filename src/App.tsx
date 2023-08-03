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
  None,
  Alphabet,
  Length,
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

  if (sortType) {
    visibleGoods.sort((first, second) => {
      switch (sortType) {
        case SortType.Length:
          return first.length - second.length;

        case SortType.Alphabet:
          return first.localeCompare(second);

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortReversed, setSortReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.None);

  const reorderedGoods = getReorderedGoods(
    goodsFromServer, { sortType, isReversed: sortReversed },
  );

  const orderChanged = sortReversed || sortType !== SortType.None;

  const setReset = () => {
    setSortReversed(false);
    setSortType(SortType.None);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.Alphabet,
          })}
          onClick={() => setSortType(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            !sortReversed && 'is-light',
          )}
          onClick={() => setSortReversed(current => !current)}
        >
          Reverse
        </button>

        {orderChanged && (
          <button
            type="button"
            className="button is-danger"
            onClick={setReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {reorderedGoods.map(item => (
            <li
              data-cy="Good"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
