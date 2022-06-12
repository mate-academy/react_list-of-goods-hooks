import React, { useState } from 'react';

type Props = {
  goodsList: string[];
};

const GoodsList: React.FC<Props> = ({ goodsList }) => {
  const [sort, sortBy] = useState('');
  const [isReversed, reverseList] = useState(false);

  const reset = () => {
    sortBy('');
    reverseList(false);
  };

  const getRenderList = () => {
    let visibleList = [...goodsList];

    if (sort) {
      visibleList = [...visibleList].sort((a, b) => {
        switch (sort) {
          case 'alphabet':
            return a.localeCompare(b);
          case 'length':
            return a.length - b.length;
          default:
            return 0;
        }
      });
    }

    if (isReversed) {
      visibleList = [...visibleList].reverse();
    }

    return visibleList;
  };

  return (
    <>
      <button
        type="button"
        onClick={() => reverseList(!isReversed)}
      >
        Reverse
      </button>
      <button
        type="button"
        onClick={() => sortBy('alphabet')}
      >
        Sort alphabetically
      </button>
      <button
        type="button"
        onClick={() => sortBy('length')}
      >
        Sort by length
      </button>
      <button
        type="button"
        onClick={() => reset()}
      >
        Reset
      </button>
      <ul className="goodsList">
        {getRenderList().map(good => (
          <li
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </>
  );
};

export default GoodsList;
