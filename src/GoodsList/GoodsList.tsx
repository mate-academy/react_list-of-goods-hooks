import React from 'react';
import './GoodsList.scss';

type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <div className="GoodsList">
    <ul className="GoodsList__list">
      {goods.map((good) => (
        <li key={good} className="GoodsList__item">
          {good}
        </li>
      ))}
    </ul>
  </div>
);
