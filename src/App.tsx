import React, { useState } from 'react';
import './App.scss';
import { GoodsList } from './Components/GoodsList';

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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isGoodsVisible, setIsGoodsVisible] = useState(false);
  const [lettersLimit, setLettersLimit] = useState(1);

  const showGoodsList = () => {
    setIsGoodsVisible(true);
  };

  const reverseGoods = () => {
    setGoods((prevGoods) => [...prevGoods].reverse());
  };

  const sortAlphabetical = () => {
    setGoods((prevGoods) => [...prevGoods]
      .sort((goodA, goodB) => goodA.localeCompare(goodB)));
  };

  const sortByLength = () => {
    setGoods((prevGoods) => [...prevGoods]
      .sort((goodA, goodB) => goodA.length - goodB.length));
  };

  const reset = () => {
    setLettersLimit(1);
    setGoods([...goodsFromServer]);
  };

  const filterByLength = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLettersLimit(Number(event.currentTarget.value));
  };

  const listToShow = goods.filter(g => g.length >= lettersLimit);

  return (
    <div className="App">
      <h1>Goods</h1>

      {isGoodsVisible
        ? (
          <>
            <GoodsList
              goods={listToShow}
            />

            <button
              type="button"
              className="btn"
              onClick={reverseGoods}
            >
              Reverse
            </button>

            <button
              type="button"
              className="btn"
              onClick={sortAlphabetical}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className="btn"
              onClick={sortByLength}
            >
              Sort by Length
            </button>

            <button
              type="button"
              className="btn"
              onClick={reset}
            >
              Reset
            </button>

            <div className="select">
              Select word Length:
              {' '}
              <select
                name="length"
                className="select__length"
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
        )
        : (
          <button
            type="button"
            className="btn btn--start"
            onClick={showGoodsList}
          >
            Show
          </button>
        )}
    </div>
  );
};

export default App;
