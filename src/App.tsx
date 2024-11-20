import React, { useState } from 'react';
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

enum StatusType {
  alphabet = 'by-alphabetically',
  length = 'by-length',
}

type Status = StatusType.alphabet | StatusType.length | null;

function sortBy(arr: string[], status: Status, isReversed: boolean) {
  const sortedArr = [...arr];

  switch (status) {
    case StatusType.alphabet:
      sortedArr.sort((a, b) => a.localeCompare(b));
      break;
    case StatusType.length:
      sortedArr.sort((a, b) => a.length - b.length);
      break;
    default:
  }

  if (isReversed) {
    sortedArr.reverse();
  }

  return sortedArr;
}

export const App: React.FC = () => {
  const [status, setStatus] = useState<Status>(null);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const goods = sortBy(goodsFromServer, status, isReversed);

  const handleSort = (newStatus: StatusType.alphabet | StatusType.length) => {
    setStatus(newStatus);
  };

  const handleReverse = () => {
    setIsReversed((prev: boolean) => !prev);
  };

  const handleReset = () => {
    setStatus(null);
    setIsReversed(false);
  };

  const isModified = status !== null || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-success ${status !== 'by-alphabetically' ? 'is-light' : ''}`}
          onClick={() => handleSort(StatusType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${status !== 'by-length' ? 'is-light' : ''}`}
          onClick={() => handleSort(StatusType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-success ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-success"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
