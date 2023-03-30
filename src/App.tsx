import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

const goodsFromServer = [
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
  ALPHABET,
  LENGTH,
  NONE,
}

type ReorderedOptions = {
  sortType: SortType,
  isReversed: boolean,
};

function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderedOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((goodOne, goodTwo) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return goodOne.localeCompare(goodTwo);

      case SortType.LENGTH:
        return goodOne.length - goodTwo.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [sortedGoods, setSortedGoods] = useState(goodsFromServer);

  useEffect(() => {
    setSortedGoods(
      getReorderedGoods(goodsFromServer, { sortType, isReversed }),
    );
  }, [sortType, isReversed]);

  function sortByAlphabet() {
    setSortType(SortType.ALPHABET);
  }

  function sortByLength() {
    setSortType(SortType.LENGTH);
  }

  function reverseList() {
    setIsReversed(!isReversed);
  }

  function resetResult() {
    setIsReversed(false);
    setSortType(SortType.NONE);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={reverseList}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetResult}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => {
          return (
            <li data-cy="Good" key={good}>{good}</li>
          );
        })}
      </ul>
    </div>
  );
};
