import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './components/GoodsList';
import { SortBy } from './enums/SortBy';

const goodsFromServer: string[] = [
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

const App: React.FC<{}> = () => {
  const [goods] = useState(goodsFromServer);
  const [showList, setGoodsShowList] = useState(false);
  const [lettersLimit, setLettersLimit] = useState(1);
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState(SortBy.none);

  const show = () => {
    setGoodsShowList((prevValue) => !prevValue);
  };

  const reverse = () => {
    setIsReversed((prevValue) => !prevValue);
  };

  const filterByLength = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.currentTarget.value;

    setLettersLimit(Number(newValue));
  };

  const sortAlphabetically = () => {
    setSortBy(SortBy.alphabet);
  };

  const sortByLength = () => {
    setSortBy(SortBy.nameLength);
  };

  const reset = () => {
    setSortBy(SortBy.none);
    setIsReversed(false);
    setLettersLimit(1);
  };

  const listToShow = goods.filter(g => g.length >= lettersLimit);

  switch (sortBy) {
    case SortBy.alphabet:
      listToShow.sort((g1, g2) => (g1.localeCompare(g2)));
      break;

    case SortBy.nameLength:
      listToShow.sort((g1, g2) => (g1.length - g2.length));
      break;

    default:
      // throw new Error('unusedCaseException');
      break;
  }

  if (isReversed) {
    listToShow.reverse();
  }

  return (
    <div className="app">
      {!showList && (
        <button
          className="app__btn"
          type="button"
          onClick={show}
        >
          show list
        </button>
      )}

      {showList
      && (
        <>
          <GoodsList
            goods={listToShow}
          />
          <div className="app__sort-btn-container">
            <button
              className="app__btn"
              type="button"
              onClick={reverse}
            >
              reverse
            </button>
            <button
              className="app__btn"
              type="button"
              onClick={sortAlphabetically}
            >
              Sort alphabetically
            </button>
            <button
              className="app__btn"
              type="button"
              onClick={reset}
            >
              reset
            </button>
            <button
              className="app__btn"
              type="button"
              onClick={sortByLength}
            >
              sort by length
            </button>
            <select
              name="length"
              className="app__lettersCountFilter"
              value={lettersLimit}
              onChange={filterByLength}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
