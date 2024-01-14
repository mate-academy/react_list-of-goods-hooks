import React from 'react';
import { Good } from '../../types/Good';

interface Props {
  good: Good;
}

export const GoodInfo: React.FC<Props> = ({ good }) => (
  <li data-cy="Good">{good}</li>
);
