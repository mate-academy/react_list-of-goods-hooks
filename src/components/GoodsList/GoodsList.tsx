import React, { useState } from 'react';

type Props = {
  goods: string[],
};

const GoodsList: React.FC<Props> = ({ goods }) => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const newGoods = [...goods];

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

      <div className="buttons">
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
      </div>
    </>
  );
};

export default GoodsList;
