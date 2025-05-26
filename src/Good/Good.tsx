import { Good as GoodInterface } from '../types/Good';
import React from 'react';

interface Props {
  good: GoodInterface;
}

export const Good: React.FC<Props> = ({ good }) => {
  return (
    <li key={good.id} data-cy="Good">
      {good.text}
    </li>
  );
};
