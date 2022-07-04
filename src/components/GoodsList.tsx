import React, { useState } from 'react';

type Props = {
  goods: string[],
};

export const GoodsList: React.FunctionComponent<Props> = ({ goods }) => {
  const [isReverse, setReverse] = useState(false);
  const [sort, setSort] = useState('');

  const visibleGoods = [...goods];

  visibleGoods.sort((g1, g2) => {
    switch (sort) {
      case 'length':
        return g1.length - g2.length;
      case 'abc':
        return g1.localeCompare(g2);
      default:
        return 0;
    }
  });

  if (isReverse) {
    visibleGoods.reverse();
  }

  const reverse = () => {
    setReverse(current => !current);
  };

  const sortAlphabetically = () => {
    setSort('abc');
  };

  const reset = () => {
    setReverse(false);
    setSort('');
  };

  const sortByLength = () => {
    setSort('length');
  };

  return (
    <div>
      <ul>
        {visibleGoods.map(good => {
          return (
            <li key={good}>
              {good}
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={reverse}
      >
        Reverse
      </button>

      <button
        type="button"
        onClick={sortAlphabetically}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        onClick={reset}
      >
        Reset
      </button>

      <button
        type="button"
        onClick={sortByLength}
      >
        Sort by length
      </button>
    </div>
  );
};
