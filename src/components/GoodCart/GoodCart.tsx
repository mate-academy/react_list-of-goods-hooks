import React from 'react';
export type Props = {
  good: string;
};

export const GoodCard: React.FC<Props> = ({ good }) => {
  return <li data-cy="Good">{good}</li>;
};
