import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { v4 as uuidv4 } from 'uuid'; // eslint-disable-line

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
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [currentList, setCurrentList] = useState<string[]>(goodsFromServer);
  const [sortBy, setSortBy] = useState<string>('');
  const [isReverse, setIsReverse] = useState<boolean>(false);

  const handleSortAlfabet = () => {
    const sortedAlphabetically = [...currentList].sort((good1, good2) => {
      return isReverse
        ? good2.localeCompare(good1)
        : good1.localeCompare(good2);
    });

    setCurrentList(sortedAlphabetically);
    setSortBy(SortType.Alphabet);
  };

  const handleSortByLength = () => {
    const sortedByLength = [...currentList].sort((good1, good2) => {
      return isReverse
        ? good2.length - good1.length
        : good1.length - good2.length;
    });

    setCurrentList(sortedByLength);
    setSortBy(SortType.Length);
  };

  const handleReverse = () => {
    const reverseData = [...currentList].reverse();

    setCurrentList(reverseData);
    setIsReverse((reverse) => !reverse);
  };

  const handleReset = () => {
    setCurrentList(goodsFromServer);
    setSortBy('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortBy !== SortType.Alphabet && 'is-light'
          } `}
          onClick={handleSortAlfabet}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSortByLength}
          type="button"
          className={`button is-success ${
            sortBy !== SortType.Length && 'is-light'
          } `}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={`button is-warning ${!isReverse && 'is-light'} `}
        >
          Reverse
        </button>
        {(sortBy || isReverse) && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {currentList.map((item) => {
          const idUuid = uuidv4();

          return (
            <li key={idUuid} data-cy="Good">
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
