import React from 'react';
import './GoodsList.scss';

type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul className="Goods__list">
      {goods.map(good => (
        <li key={good} className="Goods__item">
          {good}
        </li>
      ))}
    </ul>
  );
};
