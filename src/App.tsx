import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

type Goods = string[];

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

const sortByAlphabet = (data: Goods) => {
  return data.sort((a, b) => a.localeCompare(b));
};

const sortByLength = (data: Goods) => {
  return data.sort((a, b) => a.length - b.length || a.localeCompare(b));
};

enum Sorting {
  Initial = '',
  Alphabet = 'ALPHABET',
  Length = 'LENGTH',
}

type Props = {
  reversed?: boolean;
  sorted?: Sorting;
};

export const App: React.FC<Props> = ({ reversed = false, sorted = '' }) => {
  const [isReversed, setIsReversed] = useState(reversed);
  const [sortedBy, setSortedBy] = useState(sorted);

  const toggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const isResetButtonVisible = sortedBy || isReversed;

  const getPreparedData = () => {
    let result = [...goodsFromServer];

    if (sortedBy) {
      result =
        sortedBy === Sorting.Alphabet
          ? sortByAlphabet(result)
          : sortByLength(result);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortedBy !== Sorting.Alphabet,
          })}
          onClick={() => {
            setSortedBy(Sorting.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortedBy !== Sorting.Length,
          })}
          onClick={() => {
            setSortedBy(Sorting.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortedBy(Sorting.Initial);
              setIsReversed(reversed);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getPreparedData().map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
