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

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((x, y) => {
    switch (sortType) {
      case SortType.ALPABET:
        return x[sortType].localeCompare(y[sortType]);

      case SortType.LENGTH:
        return x.length - y.length;
      default:
        return 0;
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
  const [isReversed, setReverse] = useState(false);
  const [sortType, setType] = useState(SortType.NONE);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setType(SortType.ALPABET);
          }}
          type="button"
          className={sortType === SortType.ALPABET
            ? ('button is-info')
            : ('button is-info is-light')}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setType(SortType.LENGTH);
          }}
          type="button"
          className={sortType === SortType.LENGTH
            ? ('button is-success')
            : ('button is-success is-light')}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReverse(!isReversed);
          }}
          type="button"
          className={isReversed
            ? ('button is-warning')
            : ('button is-warning is-light')}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE)
          && (
            <button
              onClick={() => {
                setReverse(false);
                setType(SortType.NONE);
              }}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {getReorderedGoods(goodsFromServer, sortType, isReversed).map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
