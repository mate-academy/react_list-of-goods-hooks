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

// type State = {
//   isReversed: boolean,
//   sortType: number,
// }
function getSortChoice(wordOne: string, wordTwo: string, SortType2: number) {
  switch (+SortType2) {
    case SortType.ALPHABET:
      return wordOne.localeCompare(wordTwo);
    case SortType.LENGTH:
      return wordOne.length - wordTwo.length;
    case SortType.NONE:
    default:
      return 0;
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

  if (isReversed === true) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [stateArray, setStateArray] = useState({
    isReversed: false,
    sortType: 0,
  });

  function sortByAlphabet() {
    setStateArray({
      isReversed: false,
      sortType: SortType.ALPHABET,
    });
  }

  function sortByLength() {
    setStateArray({
      isReversed: false,
      sortType: SortType.LENGTH,
    });
  }

  function reverse() {
    setStateArray(prevState => ({
      isReversed: !prevState.isReversed, sortType: prevState.sortType,
    }));
  }

  function reset() {
    setStateArray({
      isReversed: false,
      sortType: SortType.NONE,
    });
  }

  const sort = stateArray.sortType;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', {
            'is-info is-light': sort !== SortType.ALPHABET,
            'is-info': sort === SortType.ALPHABET,
          })}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', {
            'is-success is-light': sort !== SortType.LENGTH,
            'is-success': sort === SortType.LENGTH,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', {
            'is-warning is-light': stateArray.isReversed !== true,
            'is-warning': stateArray.isReversed === true,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(stateArray.sortType !== SortType.NONE
          || stateArray.isReversed === true) && (
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
          {getReorderedGoods(
            goodsFromServer, stateArray.sortType, stateArray.isReversed,
          ).map(
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
