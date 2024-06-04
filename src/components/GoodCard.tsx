import React from 'react';

interface GoodCardProps {
  good: string;
}

const GoodCard: React.FC<GoodCardProps> = ({ good }) => (
  <li data-cy="Good">{good}</li>
);

export default GoodCard;
