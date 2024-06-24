import React from 'react';
import { Good } from '../types/Good';

type Props = {
  good: Good;
};

export const GoodProduct: React.FC<Props> = ({ good }) => (
  <li data-cy="Good" key={good.id}>
    {good.name}
  </li>
);
