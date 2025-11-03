import React from 'react';
import GoodsItem from '../GoodsItem';

interface Props {
  goods: string[];
}

const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <GoodsItem key={good} good={good} />
      ))}
    </ul>
  );
};

export default GoodsList;
