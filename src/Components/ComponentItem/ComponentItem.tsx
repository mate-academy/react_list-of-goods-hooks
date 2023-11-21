import React from 'react';

interface Props {
  good: string
}

export const ComponentItem: React.FC<Props> = ({ good }) => (
  <li data-cy="Good">{good}</li>
);
