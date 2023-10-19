import React from 'react';

interface Props {
  goods: string[]
}
export const Products: React.FC<Props> = ({ goods }) => (
  <ul>
    <ul>
      {goods.map((x: string) => (
        <li data-cy="Good">{x}</li>
      ))}
    </ul>
  </ul>
);
