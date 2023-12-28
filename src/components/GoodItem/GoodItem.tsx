import React from 'react';

type Props = {
  el: string;
};

export const GoodItem: React.FC<Props> = ({ el }) => {
  return (
    <li data-cy="Good">{el}</li>
  );
};
