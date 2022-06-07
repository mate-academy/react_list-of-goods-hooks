import React from 'react';
import './GoodsList.css';

interface Props {
  goods: string[],
}

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul className="goods-list">
      {goods.map(goodItem => (
        <li className="goods-list__item" key={goodItem}>
          {goodItem}
        </li>
      ))}
    </ul>
  );
};
