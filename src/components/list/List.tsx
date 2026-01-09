import React from 'react';
import { Item } from '../item/Item';

type Props = {
  goods: string[];
};
export const List: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <Item good={good} key={good} />
    ))}
  </ul>
);
