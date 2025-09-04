import React from 'react';
import { GoodType } from '../../types/GoodType';

interface Props {
  good: GoodType;
}

export const Good: React.FC<Props> = ({ good }) => (
  <li data-cy="Good">{good}</li>
);
