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

function getSortChoice(wordOne: string, wordTwo: string, SortType2: number) {
  switch (+SortType2) {
    case SortType.ALPHABET:
      return wordOne.localeCompare(wordTwo);
    case SortType.LENGTH:
      return wordOne.length - wordTwo.length;
    case SortType.NONE:
    default:
      return SortType.NONE;
  }
}

export function getReorderedGoods(
  goods: string[],
  sortType: number,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort(
    (
      wordOne, wordTwo,
    ) => getSortChoice(
      wordOne, wordTwo, sortType,
    ),
  );

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  function sortByAlphabet() {
    setSortType(SortType.ALPHABET);
  }

  function sortByLength() {
    setSortType(SortType.LENGTH);
  }

  function reverse() {
    setIsReversed(prevState => (!prevState));
  }

  function reset() {
    setIsReversed(false);
    setSortType(SortType.NONE);
  }

  const sort = sortType;
  const goods = getReorderedGoods(
    goodsFromServer, sortType, isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info ', {
            'is-light': sort !== SortType.ALPHABET,
          })}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sort !== SortType.LENGTH,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning ', {
            'is-light': isReversed !== true,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE
          || isReversed === true) && (
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
          {goods.map(
            (good: string) => (
              <li data-cy="Good" key={good}>
                {good}
              </li>
            ),
          )}
        </ul>
      </ul>
    </div>
  );
};
