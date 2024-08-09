import { GoodCard } from '../GoodCard/GoodCard';
import React from 'react';

interface GoodListProps {
  goods: string[];
}

export const GoodList: React.FC<GoodListProps> = ({ goods }: GoodListProps) => {
  return (
    <section className="TodoList">
      <ul>
        {goods.map(good => (
          <GoodCard good={good} key={good} />
        ))}
      </ul>
    </section>
  );
};
