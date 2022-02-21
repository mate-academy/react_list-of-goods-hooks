import React from 'react';
import './GoodsList.css';

type Props = {
  goodsList: string[],
};

export const GoodsList: React.FC<Props> = ({ goodsList }) => {
  return (
    <>
      <ul className="list">
        {goodsList.map(good => (
          <li key={good}>
            {good}
          </li>
        ))}
      </ul>
    </>
  );
};
