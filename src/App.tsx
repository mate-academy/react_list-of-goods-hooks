import React from 'react';
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

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((firstGood, secondGood) => (
      firstGood.localeCompare(secondGood)));
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((firstGood, secondGood) => (
      firstGood.length - secondGood.length));
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = React.useState(false);
  const [sortType, setSortType] = React.useState(SortType.NONE);

  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  const sortByAlphabetical = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleReset = () => {
    setSortType(SortType.ALPHABET);
    setIsReversed(false);
  };

  const sortByReverse = () => {
    setIsReversed(currentState => !currentState);
  };

  const resetButton = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={sortByAlphabetical}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': !isReversed },
          )}
          onClick={sortByReverse}
        >
          Reverse
        </button>

        {resetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map((good) => (
            <li key={good} data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
