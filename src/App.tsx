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

  visibleGoods.sort((first, second) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return first.localeCompare(second);
      case SortType.LENGTH:
        return first.length - second.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [alphabetSortedButton, setAlphabetSortedButton] = useState(true);
  const [lengthSortedButton, setLengthSortedButton] = useState(true);
  const [resetButton, setResetButton] = useState(false);
  const [isReversed, reverseSet] = useState(false);
  const [sortType, setTypeOfSort] = useState(SortType.NONE);

  const sortByAlphabet = () => {
    setTypeOfSort(SortType.ALPHABET);
    setAlphabetSortedButton(false);
    setLengthSortedButton(true);
    setResetButton(true);
  };

  const sortByLength = () => {
    setTypeOfSort(SortType.LENGTH);
    setAlphabetSortedButton(true);
    setLengthSortedButton(false);
    setResetButton(true);
  };

  const reverse = () => {
    reverseSet(current => !current);
    setResetButton(!(
      alphabetSortedButton
      && lengthSortedButton
      && isReversed
    ));
  };

  const reset = () => {
    setAlphabetSortedButton(true);
    setLengthSortedButton(true);
    setResetButton(false);
    reverseSet(false);
    setTypeOfSort(SortType.NONE);
  };

  const arrayModified
  = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortByAlphabet}
          className={classNames(
            'button is-info',
            {
              'is-light': alphabetSortedButton,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={classNames(
            'button is-success',
            {
              'is-light': lengthSortedButton,
            },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverse}
          className={classNames(
            'button is-warning',
            {
              'is-light': !isReversed,
            },
          )}
        >
          Reverse
        </button>

        {resetButton
        && (
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
        {arrayModified.map(item => (
          <li
            data-cy="Good"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
