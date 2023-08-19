import React from 'react';
import { Good } from './types/good';

interface Props {
  good: Good;
}

export const GoodCard: React.FC<Props> = ({ good }) => (
  <li data-cy="Good">{good}</li>
);
