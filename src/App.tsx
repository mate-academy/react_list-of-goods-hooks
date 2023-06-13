import React, { useEffect, useState } from 'react';
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

export const App: React.FC = () => {
  const [isSortedAlphabetically, setAlphabet] = useState(false);
  const [isSortedByLength, setLength] = useState(false);
  const [isReversed, setReverse] = useState(false);
  const [originalOrder, setOriginalOrder] = useState<string[]>([]);
  const [sortedArray, setSortedArray] = useState<string[]>([]);

  useEffect(() => {
    setOriginalOrder([...goodsFromServer]);
    setSortedArray([...goodsFromServer]);
  }, []);

  const sortByAlphabet = () => {
    setAlphabet(!isSortedAlphabetically);
    setLength(false);
    let sorted;

    if (isReversed) {
      sorted = [...sortedArray].sort((a, b) => b.localeCompare(a));
    } else {
      sorted = [...sortedArray].sort((a, b) => a.localeCompare(b));
    }

    setSortedArray(sorted);
  };

  const sortByLength = () => {
    setLength(!isSortedByLength);
    setAlphabet(false);
    let sorted;

    if (isReversed) {
      sorted = [...sortedArray].sort((a, b) => b.length - a.length);
    } else {
      sorted = [...sortedArray].sort((a, b) => a.length - b.length);
    }

    setSortedArray(sorted);
  };

  const reverse = () => {
    setReverse(!isReversed);
    const reversed = [...sortedArray].reverse();

    setSortedArray(reversed);
  };

  const reset = () => {
    setReverse(false);
    setAlphabet(false);
    setLength(false);
    setSortedArray([...originalOrder]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${!isSortedAlphabetically ? 'is-light' : ''}`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${!isSortedByLength ? 'is-light' : ''}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${!isReversed ? 'is-light' : ''}`}
          onClick={reverse}
        >
          Reverse
        </button>

        { (isReversed || isSortedAlphabetically || isSortedByLength) && (
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
        {sortedArray.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
