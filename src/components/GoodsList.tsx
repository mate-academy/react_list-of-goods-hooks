import React from 'react';
import './GoodsList.scss';

type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul className="list">
    {goods.map(good => (
      <li key={good}>{good}</li>
    ))}
  </ul>
);
