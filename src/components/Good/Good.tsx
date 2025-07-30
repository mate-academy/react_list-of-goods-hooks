import React from 'react';
import { TGood } from '../../types/TGood';

type Props = {
  good: TGood;
};

export const Good: React.FC<Props> = ({ good }) => {
  return <li data-cy="Good">{good}</li>;
};
