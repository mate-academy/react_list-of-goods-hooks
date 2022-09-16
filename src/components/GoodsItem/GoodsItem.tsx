import React from 'react';

type Props = {
  label: string
};

export const GoodsItem: React.FC<Props> = ({ label }) => (
  <li data-cy="Good">{label}</li>
);
