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
  ALPABET,
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

  switch (sortType) {
    case SortType.ALPABET:
      visibleGoods.sort((g1, g2) => g1.localeCompare(g2));
      break;

    case SortType.LENGTH:
      visibleGoods.sort((g1, g2) => g1.length - g2.length);
      break;

    default:
      visibleGoods.map(good => good);
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
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const sortAlphabetically = () => {
    setSortType(SortType.ALPABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const getRevers = () => {
    setIsReversed(current => !current);
  };

  const getReset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info ',
            {
              'is-light': sortType !== SortType.ALPABET,
            },
          )}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success ',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning ',
            {
              'is-light': isReversed === false,
            },
          )}
          onClick={getRevers}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={getReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getReorderedGoods(goodsFromServer, { sortType, isReversed })
          .map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
      </ul>
    </div>
  );
};
