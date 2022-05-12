import React, { useState, useMemo } from 'react';

type Props = {
  goods: string[],
};

const GoodsList: React.FC<Props> = ({ goods }) => {
  const startLength = 1;
  const [length, setLength] = useState(startLength);
  const [isReverse, setIsReverse] = useState(false);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const newGoods = useMemo(() => [...goods]
    .filter(good => good.length >= length), [length, sortBy === null]);

  const reverse = () => {
    setIsReverse(!isReverse);
  };

  const sortByName = () => {
    setSortBy('name');
    setIsReverse(false);
  };

  const sortByLength = () => {
    setSortBy('length');
    setIsReverse(false);
  };

  const reset = () => {
    setLength(startLength);
    setSortBy(null);
    setIsReverse(false);
  };

  if (sortBy) {
    newGoods.sort((goodOne, goodTwo) => {
      switch (sortBy) {
        case ('name'):
          return goodOne.localeCompare(goodTwo);
        case ('length'):
          return goodOne.length - goodTwo.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    newGoods.reverse();
  }

  return (
    <>
      <ul className="app__list">
        {newGoods.map(good => (
          <li
            className="app__list__item"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>

      <div className="sort">
        <button
          type="button"
          className="app__button"
          onClick={reverse}
        >
          Reverse
        </button>

        <button
          type="button"
          className="app__button"
          onClick={sortByName}
        >
          Sort by name
        </button>

        <button
          type="button"
          className="app__button"
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="app__button"
          onClick={reset}
        >
          Reset
        </button>

        <select
          className="app__button"
          onChange={(event) => setLength(+event.target.value)}
          value={length}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </div>
    </>
  );
};

export default GoodsList;
