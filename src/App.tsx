import React, { useState } from 'react';
import './App.scss';
import { v4 as uuidv4 } from 'uuid';
import { SortType, Good } from './types';

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
].map(el => ({
  name: el,
  id: uuidv4(),
}));

const App: React.FC = () => {
  const [isVisibleToggle, setIsVisibleToggle] = useState(false);
  const [isReversedToggle, setIsReversedToggle] = useState(false);
  const [sortBy, setSortBy] = useState(SortType.none);
  const [itemLength, setItemLength] = useState('1');

  const showGoods = () => {
    setIsVisibleToggle(!isVisibleToggle);
  };

  const reverse = () => {
    setIsReversedToggle(!isReversedToggle);
  };

  const sortByAlph = () => {
    setSortBy(SortType.alph);
  };

  const sortByLength = () => {
    setSortBy(SortType.length);
  };

  const reset = () => {
    setSortBy(SortType.none);
    setIsReversedToggle(false);
  };

  const preparedGoods = (goods: Good[]) => {
    const prepareGoods = [...goods];

    prepareGoods.sort((a, b) => {
      switch (sortBy) {
        case SortType.alph:
          return a.name.localeCompare(b.name);
        case SortType.length:
          return a.name.length - b.name.length;
        default:
          return 0;
      }
    });

    if (isReversedToggle) {
      prepareGoods.reverse();
    }

    return prepareGoods;
  };

  return (
    <div className="App">
      {isVisibleToggle
        ? (
          <>
            <div className="App__buttons">
              <button
                type="button"
                onClick={showGoods}
                className="App__btn App__btn--uniq"
              >
                Hide
              </button>
              <button
                type="button"
                onClick={reverse}
                className="App__btn"
              >
                Reverse
              </button>
              <button
                type="button"
                onClick={sortByAlph}
                className="App__btn"
              >
                Sort alphabetically
              </button>
              <button
                type="button"
                onClick={sortByLength}
                className="App__btn"
              >
                Sort by length
              </button>
              <button
                type="button"
                onClick={reset}
                className="App__btn App__btn--uniq"
              >
                Reset
              </button>
              <select
                value={itemLength}
                onChange={event => {
                  setItemLength(event.target.value);
                }}
                className="App__select"
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
            </div>
            <ul className="App__list">
              {preparedGoods(goodsFromServer).map(good => {
                const isVisible = good.name.length >= Number(itemLength);

                return (
                  isVisible
                  && (
                    <li
                      key={good.id}
                      className="App__list-item"
                    >
                      {good.name}
                    </li>
                  )
                );
              })}
            </ul>
          </>
        )
        : (
          <div className="App__start-container">
            <button
              type="button"
              onClick={showGoods}
              className="App__start-btn"
            >
              Start
            </button>
          </div>
        )}
    </div>
  );
};

export default App;
