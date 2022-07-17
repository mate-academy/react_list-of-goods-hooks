import React, { useState } from 'react';

enum SortType {
  Alphabetic = 'alphabetic',
  Length = 'length',
  Default = 'default',
}

type Props = {
  goods: string[],
};
export const GoodsList: React.FC<Props> = ({ goods }: Props) => {
  const goodsList = [...goods];
  const [isReversed, setReversed] = useState(false);
  const [sortBy, setSortBy] = useState(SortType.Default);

  goodsList.sort((prod1, prod2) => {
    switch (sortBy) {
      case SortType.Length:
        return prod1.length - prod2.length;
      case SortType.Alphabetic:
        return prod1.localeCompare(prod2);
      default:
        return 0;
    }
  });

  if (isReversed) {
    goodsList.reverse();
  }

  return (
    <>
      <ul className="goodsList">
        {goodsList.map(item => (
          <li key={item} className="">
            {item}
          </li>
        ))}
      </ul>
      <div className="buttons">
        <button
          type="button"
          onClick={() => setReversed(!isReversed)}
          className="button"
        >
          Reverse
        </button>
        <button
          type="button"
          onClick={() => setSortBy(SortType.Alphabetic)}
          className="button"
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          onClick={() => setSortBy(SortType.Length)}
          className="button"
        >
          Sort by length
        </button>
        <button
          type="button"
          onClick={() => {
            setSortBy(SortType.Default);
            setReversed(false);
          }}
          className="button is-danger"
        >
          Reset
        </button>
      </div>
    </>
  );
};
