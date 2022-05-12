import React from 'react';
import './GoodList.css';

type Props = {
  goods: string[],
};

export const GoodList:React.FC<Props> = ({ goods }) => {
  return (
    <ul className="good-list">
      {goods.map((good) => (
        <li className="good-list__item" key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
};
