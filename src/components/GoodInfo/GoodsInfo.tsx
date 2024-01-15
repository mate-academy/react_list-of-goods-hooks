import React from 'react';
import { Good } from '../../types/Good';

type Props = {
  good: Good,
};

export const GoodsInfo: React.FC<Props> = ({ good }) => {
  return (
    <li data-cy="Good" key={good}>{good}</li>
  );
};
