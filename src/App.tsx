import React, { useState } from 'react';
import './App.css';

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
  const [maxLength, setMaxLength] = useState(1);

  const toogleVisibility = () => {
    setIsGoodsVisible(current => !current);
  };

  const reverseGoods = () => {
    setGoods([...goods.reverse()]);
  };

  const sortAlphaBetically = () => {
    setGoods([...goods.sort((
      firstGood,
      secondGood,
    ) => firstGood.localeCompare(secondGood))]);
  };

  const sortByLength = () => {
    setGoods([...goods.sort((
      firstGood,
      secondGood,
    ) => firstGood.length - secondGood.length)]);
  };

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
    setMaxLength(1);
  };

  const selectGoods = (value: string) => {
    const length: number = +value;

    setMaxLength(length);
  };

  const preparedGoods = goods.filter(good => good.length >= maxLength);

  return (
    <div className="App">
      <h1>Goods</h1>
      <button type="button" onClick={toogleVisibility}>
        {isGoodsVisible ? 'Hide goods' : 'Start'}
      </button>
      {isGoodsVisible && (
        <>
          <button type="button" onClick={reverseGoods}>Reverse</button>
          <button type="button" onClick={sortAlphaBetically}>Sort alphabetically</button>
          <button type="button" onClick={resetGoods}>Reset</button>
          <button type="button" onClick={sortByLength}>Sort by length</button>
          <select
            name="select"
            id="select"
            value={maxLength}
            onChange={(event) => selectGoods(event.target.value)}
          >
            {goods.map(el => (
              <option value={`${goods.indexOf(el) + 1}`}>
                {goods.indexOf(el) + 1}
              </option>
            ))}
          </select>
          {preparedGoods.map(good => (
            <li key={good}>{good}</li>
          ))}
        </>
      )}
    </div>
  );
};

export default App;
