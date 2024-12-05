import React from 'react';
import { GoodType } from '../types/GoodType';

interface GoodProps {
  good: GoodType;
}

export const Good: React.FC<GoodProps> = ({ good }) => {
  return <li data-cy="Good">{good.name}</li>;
};
