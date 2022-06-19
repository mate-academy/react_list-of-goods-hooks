import React from 'react';
import './GoodsList.scss';

type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <div className="container">
      <ul className="has-text-centered goods-list">
        {goods.map(good => (
          <li key={good} className="level-item">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
