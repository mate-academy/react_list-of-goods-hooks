import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods]
    .sort((prevGood, currGood) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return prevGood.localeCompare(currGood);

        case SortType.LENGTH:
          return prevGood.length - currGood.length;

        case SortType.NONE:
          return 0;

        default:
          throw new Error(`Unknown type of sort - ${sortType}`);
      }
    });

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={() => setIsReversed(!isReversed)}
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
          getReorderedGoods(goodsFromServer, { sortType, isReversed })
            .map(good => (
              <li data-cy="Good" key={good}>{good}</li>
            ))
        }
      </ul>
    </div>
  );
};
