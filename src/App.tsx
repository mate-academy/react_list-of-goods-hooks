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
  None,
  Alphabet,
  Length,
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

  switch (sortType) {
    case SortType.Alphabet:
      visibleGoods.sort((g1, g2) => {
        return g1.localeCompare(g2);
      });

      break;

    case SortType.Length:
      visibleGoods.sort((g1, g2) => {
        return g1.length - g2.length;
      });

      break;

    default:
      break;
  }

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const sortAlphabetically = () => {
    setSortType(SortType.Alphabet);
  };

  const sortByLength = () => {
    setSortType(SortType.Length);
  };

  const sortInReverse = () => {
    setIsReversed(!isReversed);
  };

  const resetSorting = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  const goods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortAlphabetically}
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.Alphabet },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.Length },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={sortInReverse}
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || isReversed) && (
          <button
            onClick={resetSorting}
            type="button"
            className={classNames(
              'button',
              'is-danger',
              'is-light',
            )}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li
              key={good}
              data-cy="Good"
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
