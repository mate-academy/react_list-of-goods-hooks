import { useState } from 'react';
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

enum SortTypes {
  DEFAULT = 'DEFAULT',
  ALPHABET = 'ALPHABET',
  LENGTH = 'LENGTH',
}

const sortHandlers = {
  ALPHABET: (good1: string, good2: string) => good1.localeCompare(good2),
  LENGTH: (good1: string, good2: string) => good1.length - good2.length,
  DEFAULT: () => 0,
};

const getPreparedGoods = (
  listOfGoods: string[],
  sortType: SortTypes,
  isReversed: boolean,
) => {
  const nextListOfGoods = [...listOfGoods];
  const sortHandler = sortHandlers[sortType];

  if (sortHandler) {
    nextListOfGoods.sort(sortHandler);
  }

  if (isReversed) {
    nextListOfGoods.reverse();
  }

  return nextListOfGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState(SortTypes.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);
  const listOfGoods = getPreparedGoods(goodsFromServer, sortType, isReversed);

  const isResetDisplayed = listOfGoods.toString() !== goodsFromServer.toString()
    || sortType !== SortTypes.DEFAULT;

  const handleSortAlphabetically = () => {
    setSortType(SortTypes.ALPHABET);
  };

  const handleSortByLength = () => {
    setSortType(SortTypes.LENGTH);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortType(SortTypes.DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortTypes.ALPHABET ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortTypes.LENGTH ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResetDisplayed && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {listOfGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
