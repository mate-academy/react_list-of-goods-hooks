import React, { useState } from 'react';

const options: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface Props {
  goods: string[];
}

export const GoodsList: React.FC<Props> = ({ goods }) => {
  const [isReversed, setReverse] = useState(false);
  const [wordMinLength, setWordMinLength] = useState(1);
  const [sortBy, setSortBy] = useState('none');

  const reverse = () => {
    setReverse((current) => !current);
  };

  const setLength = (value: number) => {
    setWordMinLength(value);
  };

  const sortByAlph = () => {
    setSortBy('alph');
  };

  const sortByLength = () => {
    setSortBy('length');
  };

  const reset = () => {
    setReverse(false);
    setWordMinLength(1);
    setSortBy('none');
  };

  const currentGoods = goods.filter(good => good.length >= wordMinLength);

  currentGoods.sort((a, b) => {
    switch (sortBy) {
      case 'alph':
        return a.localeCompare(b);
      case 'length':
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    currentGoods.reverse();
  }

  return (
    <div className="goods-list">
      <div className="goods-list__settings">
        <button
          className="button"
          type="button"
          onClick={reverse}
        >
          Reverse
        </button>

        <button
          className="button"
          type="button"
          onClick={sortByAlph}
        >
          Sort alphabetically
        </button>

        <button
          className="button"
          type="button"
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <select
          name="select-length"
          id="select-length"
          value={wordMinLength}
          onChange={({ target }) => {
            setLength(+target.value);
          }}
        >
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button
          className="button"
          type="button"
          onClick={reset}
        >
          Reset
        </button>
      </div>
      <ul className="goods-list__list">
        {currentGoods.map((good, index) => (
          <li key={good} className="goods-list__item">
            <h3>
              {`${index + 1}. ${good}`}
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
};
