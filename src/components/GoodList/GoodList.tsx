import React, { useState } from 'react';
import './GoodList.scss';

type Goods = {
  goodItems: string[]
};

export const GoodList: React.FC<Goods> = ({ goodItems }) => {
  const [goods, setGoods] = useState([...goodItems]);
  const [maxLength, setMaxLength] = useState(1);

  const reverseGoods = () => {
    setGoods([...goods].reverse());
  };

  const sortAlphaBetically = () => {
    setGoods([...goods].sort((
      firstGood,
      secondGood,
    ) => firstGood.localeCompare(secondGood)));
  };

  const sortByLength = () => {
    setGoods([...goods].sort((
      firstGood,
      secondGood,
    ) => firstGood.length - secondGood.length));
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
        className="GoodList__button"
        type="button"
        onClick={reverseGoods}
      >
        Reverse
      </button>
      <button
        className="GoodList__button"
        type="button"
        onClick={sortAlphaBetically}
      >
        Sort alphabetically
      </button>
      <button
        className="GoodList__button"
        type="button"
        onClick={sortByLength}
      >
        Sort by length
      </button>
      <button
        className="GoodList__button"
        type="button"
        onClick={resetGoods}
      >
        Reset
      </button>
      <label className="GoodList__goods">
        <select
          className="GoodList__goods-select"
          name="select"
          id="select"
          value={maxLength}
          onChange={(event) => selectGoods(event.target.value)}
        >
          {goods.map(item => (
            <option
              key={item}
              value={`${goods.indexOf(item) + 1}`}
              className="GoodList__option"
            >
              {goods.indexOf(item) + 1}
            </option>
          ))}
        </select>
      </label>
      <ul>
        {preparedGoods.map((item) => (
          <li
            className="GoodList__goods-list"
            key={item}
          >
            {item}
          </li
          >
        ))}
      </ul>
    </div>
  );
};
