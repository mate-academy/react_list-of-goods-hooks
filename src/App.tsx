import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './Components/GoodsList/GoodsList';

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

const selectOptionsValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const App:React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortByValue, setSortBy] = useState('');
  const [selectValue, setSelectValue] = useState(1);

  const isClickStart = () => {
    setIsVisible(true);
  };

  const isReverse = () => {
    setIsReversed(!isReversed);
  };

  const sortBy = (sortIdentifier: string) => {
    setSortBy(sortIdentifier);
  };

  const reset = () => {
    setSortBy('');
    setIsReversed(false);
    setSelectValue(1);
  };

  const isSelect = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;

    setSelectValue(+value);
  };

  return (
    <div className="App box">
      {!isVisible
      && (
        <button
          type="button"
          className="button is-success"
          onClick={isClickStart}
        >
          Start
        </button>
      )}
      <h1 className="title is-1">Goods</h1>
      <div className="select is-success">
        <select
          value={selectValue}
          onChange={isSelect}
        >
          {selectOptionsValue
            .map(el => <option key={el} value={el}>{el}</option>)}
        </select>

      </div>
      <button
        type="button"
        onClick={isReverse}
        className="button is-info is-light"
      >
        Reverse
      </button>
      <button
        type="button"
        onClick={() => sortBy('alphabetically')}
        className="button is-success is-light"
      >
        Sort alphabetically
      </button>
      <button
        type="button"
        onClick={() => sortBy('length')}
        className="button is-link is-light"
      >
        Sort by length
      </button>
      <button
        type="button"
        onClick={reset}
        className="button is-danger is-light"
      >
        Reset
      </button>
      {isVisible
        && (
          <GoodsList
            goodsFromServer={goodsFromServer}
            isReversed={isReversed}
            sortByValue={sortByValue}
            selectValue={selectValue}
          />
        )}
    </div>
  );
};

export default App;
