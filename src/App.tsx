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

enum SortingType {
  Alphabetical = 'alphabetical',
  Length = 'length',
  NotSorted = 'notsorted',
}

const sortingFunctions = {
  [SortingType.Alphabetical]: (a: string, b: string) => a.localeCompare(b),
  [SortingType.Length]: (a: string, b: string) => a.length - b.length,
  [SortingType.NotSorted]: false,
};

const handleSorting = (
  sortedState: SortingType,
  reverseList: boolean,
  setList: (list: string[]) => void,
) => {
  const sortedList = [...goodsFromServer];
  const sortingFunction = sortingFunctions[sortedState];

  if (typeof sortingFunction === 'function') {
    sortedList.sort(sortingFunction);
  }

  if (reverseList) {
    sortedList.reverse();
  }

  setList(sortedList);
};

const App: React.FC = () => {
  const [list, setList] = useState<string[]>(goodsFromServer);
  const [reverseList, setReverseList] = useState<boolean>(false);
  const [sortedState, setSortedState] = useState<SortingType>(
    SortingType.NotSorted,
  );

  const reset = () => {
    setList(goodsFromServer);
    setReverseList(false);
    setSortedState(SortingType.NotSorted);
  };

  useEffect(() => {
    handleSorting(sortedState, reverseList, setList);
  }, [sortedState, reverseList]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortedState === SortingType.Alphabetical ? '' : 'is-light'}`}
          onClick={() => {
            setSortedState(SortingType.Alphabetical);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortedState === SortingType.Length ? '' : 'is-light'}`}
          onClick={() => {
            setSortedState(SortingType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseList ? '' : 'is-light'}`}
          onClick={() => setReverseList(item => !item)}
        >
          Reverse
        </button>

        {(sortedState !== SortingType.NotSorted || reverseList) && (
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
        {list.map((good, index) => (
          <li key={index} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
