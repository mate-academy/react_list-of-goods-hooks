import React from 'react';

interface Props {
  good: string;
}

export const Good: React.FC<Props> = ({ good }) => <li>{good}</li>;
