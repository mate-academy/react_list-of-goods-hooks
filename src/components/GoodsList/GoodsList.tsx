import React, { useState } from 'react';

type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  const [goodsList, setGoodsList] = useState(goods);

  const reverseList = () => (
    setGoodsList([...goods].reverse())
  );
  const sortAZ = () => (
    setGoodsList([...goods].sort((a, b) => a.localeCompare(b)))
  );
  const sort09 = () => (
    setGoodsList([...goods].sort((a, b) => a.length - b.length))
  );
  const resetList = () => (
    setGoodsList(goods)
  );

  return (
    <>
      <button
        type="button"
        onClick={() => reverseList()}
      >
        Reverse
      </button>
      <button
        type="button"
        onClick={() => sortAZ()}
      >
        Sort A-Z
      </button>
      <button
        type="button"
        onClick={() => sort09()}
      >
        Sort 0-9
      </button>
      <button
        type="button"
        onClick={() => resetList()}
      >
        Reset
      </button>
      <ul>
        {goodsList.map((good) => (
          <li key={good}>
            {good}
          </li>
        ))}
      </ul>
    </>
  );
};
