import React from 'react';
import { Good } from '../../types/Good';

type Props = {
  good: Good;
};

export const GoodCard: React.FC<Props> = ({ good }) => (
  <li data-cy="Good">{good.name}</li>
);
