import React, { useState } from 'react';
import GoodsList from './components/GoodsList/GoodsList';
import SelectElement from './components/SelectElement/SelectElement';
import './App.scss';

const selectValues: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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

const App: React.FC = () => {
  const [goodsArray] = useState(goodsFromServer);
  const [visibleGoodsArray, setVisibleGoodsArray] = useState(goodsFromServer);
  const [isListHidden, setIsListHidden] = useState(true);
  const [isButtonHidden, setIsButtonHidden] = useState(false);
  const [isActionsActive, setIsActionsActive] = useState(false);
  const [selectedLength, setSelectedLength] = useState(1);

  const handleStartButtonClick = () => {
    setIsListHidden(false);
    setIsButtonHidden(true);
    setIsActionsActive(true);
  };

  const handleReverseButtonClick = () => {
    setVisibleGoodsArray([...goodsArray].reverse());
  };

  const handleSortButtonClick = () => {
    setVisibleGoodsArray([...goodsArray]
      .sort((g1, g2) => g1.localeCompare(g2)));
  };

  const handleResetButtonClick = () => {
    setVisibleGoodsArray(goodsArray);
    setSelectedLength(1);
  };

  const handleSortByLengthButtonClick = () => {
    setVisibleGoodsArray([...goodsArray]
      .sort((g1, g2) => g1.length - g2.length));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelection = (event: { target: { value: any; }; }) => {
    setSelectedLength(event.target.value);
  };

  return (
    <div className="App">
      <button
        type="button"
        className="StartButton"
        hidden={isButtonHidden}
        onClick={handleStartButtonClick}
      >
        Start
      </button>

      <h1>Goods</h1>

      <h2>
        Total amouns of goods is:
        {` ${goodsFromServer.length}`}
      </h2>

      <select
        className="SelectList"
        onChange={handleSelection}
        value={selectedLength}
      >
        <SelectElement
          values={selectValues}
        />
      </select>

      <button
        type="button"
        disabled={!isActionsActive}
        className="Actions ReverseButton"
        onClick={handleReverseButtonClick}
      >
        Reverse
      </button>

      <button
        type="button"
        disabled={!isActionsActive}
        className="Actions SortButton"
        onClick={handleSortButtonClick}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        disabled={!isActionsActive}
        className="Actions ResetButton"
        onClick={handleResetButtonClick}
      >
        Reset
      </button>

      <button
        type="button"
        disabled={!isActionsActive}
        className="Actions SortByLengthButton"
        onClick={handleSortByLengthButtonClick}
      >
        Sort by length
      </button>

      <ul
        className="GoodsList"
        hidden={isListHidden}
      >
        <GoodsList
          goods={visibleGoodsArray}
          lengthForDisplay={selectedLength}
        />
      </ul>
    </div>
  );
};

export default App;
