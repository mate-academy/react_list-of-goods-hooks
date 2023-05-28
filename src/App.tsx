import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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

function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  if (isReversed) {
    visibleGoods.reverse();
  }

  visibleGoods.sort((a: string, b: string) => {
    if (sortType === SortType.ALPHABET && isReversed) {
      return b.localeCompare(a);
    }

    if (sortType === SortType.LENGTH && isReversed) {
      return b.length - a.length;
    }

    switch (sortType) {
      case SortType.ALPHABET:
        return a.localeCompare(b);

      case SortType.LENGTH:
        return a.length - b.length;

      default:
        return 0;
    }
  });

  return visibleGoods;
}

export const App: React.FC<ReorderOptions> = () => {
  const [isReversed, setReverse] = useState(false);

  const [sortType, setSortType] = useState(SortType.NONE);

  return (
    <div className="section content">
      <div className="buttons">

        <button
          onClick={() => {
            setSortType(SortType.ALPHABET);
          }}
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortType(SortType.LENGTH);
          }}
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReverse(current => !current);
          }}
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
        >
          Reverse
        </button>

        {
          (isReversed || sortType !== SortType.NONE) && (
            <button
              onClick={() => {
                setReverse(false);
                setSortType(SortType.NONE);
              }}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )
        }

      </div>

      <ul>
        <ul>
          {
            getReorderedGoods(goodsFromServer, { sortType, isReversed })
              .map((good) => (
                <li
                  data-cy="Good"
                  key={good}
                >
                  {good}
                </li>
              ))
          }
        </ul>
      </ul>
    </div>
  );
};
