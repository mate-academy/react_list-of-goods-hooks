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
  ALPABET,
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
  const visibleGoods: string[] = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPABET:
        return good1.localeCompare(good2);

      case SortType.LENGTH:
        return good1.length - good2.length;

      case SortType.NONE:
        return 0;

      default:
        throw new Error('Wrong value for SortType');
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setValue] = useState(false);
  const [sortType, setCount] = useState(SortType.NONE);
  const orderedGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortType === SortType.ALPABET
            ? 'button is-info'
            : 'button is-info is-light'}
          onClick={() => setCount(SortType.ALPABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortType === SortType.LENGTH
            ? 'button is-success'
            : 'button is-success is-light'}
          onClick={() => setCount(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={isReversed
            ? 'button is-warning'
            : 'button is-warning is-light'}
          onClick={() => setValue(!isReversed)}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setValue(false);
              setCount(SortType.NONE);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        <ul>
          {orderedGoods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
