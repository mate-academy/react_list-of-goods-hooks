import React, { useState } from 'react';

type Props = {
  goodsList: string[],
};

export const GoodsList: React.FC<Props> = ({ goodsList }) => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const reverse = () => setIsReverse(!isReverse);

  const sort = (value: string) => {
    setSortBy(value);
  };

  const reset = () => {
    setSortBy('');
    setIsReverse(false);
  };

  const getGoodList = () => {
    let visibleList = goodsList;

    if (sortBy) {
      visibleList = [...visibleList].sort((a, b) => {
        switch (sortBy) {
          case 'alphabet':
            return a.localeCompare(b);
          case 'length':
            return (a.length - b.length);
          default:
            return 0;
        }
      });
    }

    if (isReverse) {
      visibleList = [...visibleList].reverse();
    }

    return visibleList;
  };

  return (
    <>
      <ul>
        {getGoodList().map(good => (
          <li key={good}>
            {good}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => reverse()}
        className="button is-info is-outlined"
      >
        Rverse
      </button>
      <button
        type="button"
        onClick={() => sort('alphabet')}
        className="button is-info is-outlined"
      >
        Sort alphabetically
      </button>
      <button
        type="button"
        onClick={() => sort('length')}
        className="button is-info is-outlined"
      >
        Sort by length
      </button>
      <button
        type="button"
        onClick={() => reset()}
        className="button is-danger is-outlined"
      >
        Reset
      </button>
    </>
  );
};
