import React from 'react';
import { Good } from '../types/Good';

type Props = {
  goods: Good[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul className="goods__list">
      {goods.map(good => (
        <li key={`${good}`} className="goods__item">
          {good}
        </li>
      ))}
    </ul>
  );
};
