import React, { useState } from 'react';

type Props = {
  goodsList: string[];
};

const GoodsList: React.FC<Props> = ({ goodsList }) => {
  const [sort, setSortBy] = useState('');
  const [isReversed, setReverseList] = useState(false);

  const reset = () => {
    setSortBy('');
    setReverseList(false);
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
        onClick={() => setReverseList(!isReversed)}
      >
        Reverse
      </button>
      <button
        type="button"
        onClick={() => setSortBy('alphabet')}
      >
        Sort alphabetically
      </button>
      <button
        type="button"
        onClick={() => setSortBy('length')}
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
