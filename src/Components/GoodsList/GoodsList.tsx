import React from 'react';
import './goodsList.css';

type Props = {
  goods: string[],
};

const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <li>{good}</li>
      ))}
    </ul>
  );
};

export default GoodsList;
