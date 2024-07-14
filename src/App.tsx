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
  sortType: SortType;
  isReversed: boolean;
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort();
      break;
    case SortType.LENGTH:
      visibleGoods.sort((a, b) => {
        return a.length - b.length;
      });
      break;
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

type State = {
  isReversed: boolean;
  sortType: SortType;
};

export const App: React.FC = () => {
  const [sortOptions, setSortOptions] = useState<State>({
    isReversed: false,
    sortType: SortType.NONE,
  });
  const sortAlphabetically = () => {
    setSortOptions(prevState => ({
      ...prevState,
      sortType: SortType.ALPHABET,
    }));
  };

  const sortByLength = () => {
    setSortOptions(prevState => ({
      ...prevState,
      sortType: SortType.LENGTH,
    }));
  };

  const reset = () => {
    setSortOptions(() => ({
      isReversed: false,
      sortType: SortType.NONE,
    }));
  };

  const reverse = () => {
    setSortOptions(prevState => ({
      ...prevState,
      isReversed: !prevState.isReversed,
    }));
  };

  const listOfGoods = getReorderedGoods(goodsFromServer, sortOptions);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortOptions.sortType != SortType.ALPHABET,
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortOptions.sortType != SortType.LENGTH,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !sortOptions.isReversed,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortOptions.isReversed != false ||
          sortOptions.sortType != SortType.NONE) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {listOfGoods &&
            listOfGoods.map(good => (
              <li data-cy="Good" key={good}>
                {good}
              </li>
            ))}
        </ul>
      </ul>
    </div>
  );
};
