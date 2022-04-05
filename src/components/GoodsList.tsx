import React, { useState } from 'react';

type Props = {
  goods: string[],
};

const GoodsList: React.FC<Props> = ({ goods }) => {
  const [goodsList, setGoodsList] = useState([...goods]);
  const [goodLength, setGoodLength] = useState(1);

  const list = goodsList.filter(good => good.length >= goodLength)
    .map((good) => {
      return (
        <li
          key={good}
        >
          {good}
        </li>
      );
    });

  const getGoodLength = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGoodLength(+event.target.value);
  };

  const getReverse = () => {
    setGoodsList([...goodsList].reverse());
  };

  const sortAlphabetically = () => {
    setGoodsList([...goodsList].sort((a, b) => a.localeCompare(b)));
  };

  const sortByLength = () => {
    setGoodsList([...goodsList].sort((a, b) => a.length - b.length));
  };

  const reset = () => {
    setGoodsList([...goods]);
    setGoodLength(1);
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
          value={goodLength}
          min="1"
          max="10"
          step={1}
          onChange={getGoodLength}
        />
      </label>
    </>
  );
};

export default GoodsList;
