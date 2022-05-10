import React from 'react';
import './GoodsList.css';

type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <div className="GoodsList__wrapper">
    <ul className="GoodsList">
      {goods.map((good) => (
        <li key={good} className="GoodsList__link">
          {good}
        </li>
      ))}
    </ul>
  </div>
);
