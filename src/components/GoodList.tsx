import React from 'react';
import GoodCard from './GoodCard';

interface GoodlistProps {
  goods: string[];
}

const Goodlist: React.FC<GoodlistProps> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodCard good={good} key={good} />
    ))}
  </ul>
);

export default Goodlist;
