import React, { useState } from 'react';

type Props = {
  goodsList: string[];
};

enum SortBy {
  Default = '',
  Alphabet = 'alphabet',
  Length = 'length',
}
const GoodsList: React.FC<Props> = ({ goodsList }) => {
  const [sort, setSortBy] = useState<SortBy>(SortBy.Default);
  const [isReversed, setReverseList] = useState<boolean>(false);

  const reset = () => {
    setSortBy(SortBy.Default);
    setReverseList(false);
  };

  const getRenderList = () => {
    let visibleList = [...goodsList];

    if (sort) {
      visibleList = [...visibleList].sort((a, b) => {
        switch (sort) {
          case SortBy.Alphabet:
            return a.localeCompare(b);
          case SortBy.Length:
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
        onClick={() => setSortBy(SortBy.Alphabet)}
      >
        Sort alphabetically
      </button>
      <button
        type="button"
        onClick={() => setSortBy(SortBy.Length)}
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
