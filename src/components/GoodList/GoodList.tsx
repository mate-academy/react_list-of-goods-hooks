import React, { useState } from 'react';

type Goods = {
  goodItems: string[]
};

export const GoodList: React.FC<Goods> = ({ goodItems }) => {
  const [goods, setGoods] = useState([...goodItems]);
  const [maxLength, setMaxLength] = useState(1);

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
    setGoods([...goodItems]);
    setMaxLength(1);
  };

  const selectGoods = (value: string) => {
    const length: number = +value;

    setMaxLength(length);
  };

  const preparedGoods = goods.filter(good => good.length >= maxLength);

  return (
    <div className="GoodList">
      <button
        type="button"
        onClick={reverseGoods}
      >
        Reverse
      </button>
      <button
        type="button"
        onClick={sortAlphaBetically}
      >
        Sort alphabetically
      </button>
      <button
        type="button"
        onClick={sortByLength}
      >
        Sort by length
      </button>
      <button
        type="button"
        onClick={resetGoods}
      >
        Reset
      </button>
      <select
        name="select"
        id="select"
        value={maxLength}
        onChange={(event) => selectGoods(event.target.value)}
      >
        {goods.map(item => (
          <option value={`${goods.indexOf(item) + 1}`}>
            {goods.indexOf(item) + 1}
          </option>
        ))}
      </select>
      <ul>
        {preparedGoods.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
