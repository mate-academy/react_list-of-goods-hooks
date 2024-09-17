import React from 'react';

type Props = {
  good: string;
};

export const Good: React.FC<Props> = ({ good }) => {
  return <li data-cy="Good">{good}</li>;
};
