import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

type Props = {
  goods: string[];
}

enum SortType {
  Alphabetical = 'Alphabetical',
  ByLength = 'ByLength',
  Reversed = 'Reversed',
  None = 'None'
}

export const App: React.FC<Props> = ({ goods }) => {
  const [newSorted, setNewSorted] = useState([...goods]);
  const [sortTypes, setSortType] = useState<SortType>(SortType.None);
  const [isReversedActive, setIsReversedActive] = useState<boolean>(false);

  function sortAlphabetically() {
    const sorted = [...newSorted].sort((one, two) => one.localeCompare(two));
    setNewSorted(sorted);
    setSortType(SortType.Alphabetical);
    setIsReversedActive(false);
  }

  function sortByLength() {
    const sorted = [...newSorted].sort((one, two) => one.length - two.length);
    setNewSorted(sorted);
    setSortType(SortType.ByLength);
    setIsReversedActive(false);
  }

  function reverse() {
    const sorted = [...newSorted].reverse();
    setNewSorted(sorted);
    setSortType(SortType.Reversed);
    setIsReversedActive(!isReversedActive);
  }

  function reset() {
    setNewSorted([...goods]);
    setSortType(SortType.None);
    setIsReversedActive(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortTypes !== SortType.Alphabetical
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortTypes !== SortType.ByLength
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversedActive
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortTypes !== SortType.None && isReversedActive) && (
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
        {newSorted.map(el => (
          <li key={el}>{el}</li>
        ))}
      </ul>
    </div>
  );
};
