import React from 'react';

type Props = {
  good: string;
};

export const GoodItem: React.FC<Props> = ({ good }) => (
  <li data-cy="Good">{good}</li>
);
