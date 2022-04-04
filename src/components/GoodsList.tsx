import React, { useState } from 'react';

type Props = {
  goods: string[],
};

const GoodsList: React.FC<Props> = ({ goods }) => {
  const [goodsList, setGoods] = useState([...goods]);
  const [select, setSelect] = useState(1);

  const list = goodsList.filter(good => good.length >= select)
    .map((good:string) => {
      return (
        <li
          key={good}
        >
          {good}
        </li>
      );
    });

  const getSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelect(+event.target.value);
  };

  const getReverse = () => {
    setGoods([...goodsList].reverse());
  };

  const sortAlphabetically = () => {
    setGoods([...goodsList].sort((a, b) => a.localeCompare(b)));
  };

  const sortByLength = () => {
    setGoods([...goodsList].sort((a, b) => a.length - b.length));
  };

  const reset = () => {
    setGoods([...goods]);
    setSelect(1);
  };

  return (
    <>
      <ul>
        {list}
      </ul>
      <button
        type="button"
        onClick={getReverse}
      >
        Reverse
      </button>
      <button
        type="button"
        onClick={sortAlphabetically}
      >
        sortAlphabetically
      </button>
      <button
        type="button"
        onClick={sortByLength}
      >
        sortByLength
      </button>
      <button
        type="button"
        onClick={reset}
      >
        reset
      </button>
      <label htmlFor="select">
        Choose select:
        <input
          type="number"
          id="select"
          name="select"
          value={select}
          min="1"
          max="10"
          step={1}
          onChange={getSelect}
        />
      </label>
    </>
  );
};

export default GoodsList;
