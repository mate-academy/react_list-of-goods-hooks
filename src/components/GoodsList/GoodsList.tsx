import React, { useState } from 'react';
import { SortBy } from '../../enums/SortBy';

const options: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

interface Props {
  goods: string[];
}

export const GoodsList: React.FC<Props> = ({ goods }) => {
  const [isReversed, setReverse] = useState(false);
  const [wordMinLength, setWordMinLength] = useState(1);
  const [sortBy, setSortBy] = useState(SortBy.none);

  const reverse = () => {
    setReverse((current) => !current);
  };

  const setLength = (value: number) => {
    setWordMinLength(value);
  };

  const toSortBy = (sortType: SortBy) => {
    setSortBy(sortType);
  };

  const reset = () => {
    setReverse(false);
    setWordMinLength(1);
    setSortBy(SortBy.none);
  };

  const createCurrentGoods = () => {
    const currentGoods = goods.filter(good => good.length >= wordMinLength);

    currentGoods.sort((a, b) => {
      switch (sortBy) {
        case SortBy.alph:
          return a.localeCompare(b);
        case SortBy.length:
          return a.length - b.length;
        default:
          return 0;
      }
    });

    if (isReversed) {
      currentGoods.reverse();
    }

    return currentGoods;
  };

  const currentGoods = createCurrentGoods();

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
          onClick={() => {
            toSortBy(SortBy.alph);
          }}
        >
          Sort alphabetically
        </button>

        <button
          className="button"
          type="button"
          onClick={() => {
            toSortBy(SortBy.length);
          }}
        >
          Sort by length
        </button>

        <select
          name="select-length"
          id="select-length"
          value={wordMinLength}
          onChange={({ target }) => {
            setLength(Number(target.value));
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
