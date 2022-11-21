import React, { useState } from 'react';
import classNames from 'classnames';
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

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

enum SortType {
  NONE,
  ALPABET,
  LENGTH,
}

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  let visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPABET:
      visibleGoods.sort((good1, good2) => (good1.localeCompare(good2)));
      break;

    case SortType.LENGTH:
      visibleGoods.sort((good1, good2) => (good1.length - good2.length));
      break;

    case SortType.NONE:
      visibleGoods = [...goods];
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          // eslint-disable-next-line max-len
          className={classNames('button is-info', { 'is-light': sortType !== SortType.ALPABET })}
          onClick={() => {
            setSortType(SortType.ALPABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          // eslint-disable-next-line max-len
          className={classNames('button is-success', { 'is-light': sortType !== SortType.LENGTH })}
          onClick={() => {
            setSortType(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          // eslint-disable-next-line max-len
          className={classNames('button is-warning', { 'is-light': !isReversed })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {
          (sortType !== SortType.NONE || isReversed)
            && (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={() => {
                  setSortType(SortType.NONE);
                  setIsReversed(false);
                }}
              >
                Reset
              </button>
            )
        }
      </div>

      <ul>
        {
          // eslint-disable-next-line max-len
          getReorderedGoods(goodsFromServer, { sortType, isReversed }).map((good) => (
            <li key={good} data-cy="Good">{good}</li>
          ))
        }
      </ul>
    </div>
  );
};
