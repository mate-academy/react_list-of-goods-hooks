import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Good, SortType } from './types';
import './App.css';

const goodsFromServer: Good[] = [
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
].map(good => ({
  name: good,
  id: uuidv4(),
}));

const App: React.FC = () => {
  const [isListVisible, setIsListVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [defaultLength, setDefaultLength] = useState('1');
  const [sortBy, setSortBy] = useState(SortType.none);

  const preparedGoods = (goods: Good[]) => {
    const prepareGoods = [...goods];

    prepareGoods.sort((a, b) => {
      switch (sortBy) {
        case SortType.alphabet:
          return a.name.localeCompare(b.name);
        case SortType.length:
          return a.name.length - b.name.length;
        default:
          return 0;
      }
    });

    if (isReversed) {
      prepareGoods.reverse();
    }

    return prepareGoods;
  };

  const sortedByAlphbet = () => {
    setSortBy(SortType.alphabet);
  };

  const sortedByLength = () => {
    setSortBy(SortType.length);
  };

  const showList = () => {
    setIsListVisible(true);
  };

  const reverse = () => {
    setIsReversed(true);
  };

  const reset = () => {
    setDefaultLength('1');
    setSortBy(SortType.none);
    setIsReversed(false);
  };

  return (
    <div className="App">
      <button
        type="button"
        onClick={showList}
      >
        Start
      </button>

      {isListVisible && (
          <>
            <button
              type="button"
              onClick={reverse}
            >
              Reverse
            </button>
            <button
              type="button"
              onClick={sortedByAlphbet}
            >
              Sort Alphabetically
            </button>
            <button
              type="button"
              onClick={sortedByLength}
            >
              Sort By Length
            </button>
            <button
              type="button"
              onClick={reset}
            >
              reset
            </button>

            <select
              value={defaultLength}
              onChange={event => {
                setDefaultLength(event.target.value);
              }}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>

            <ul>
              {preparedGoods(goodsFromServer).map(good => {
                const isVisible = good.name.length >= Number(defaultLength);

                return (
                  isVisible && <li key={good.id}>{good.name}</li>
                );
              })}
            </ul>
          </>
        )}
    </div>
  );
};

export default App;
