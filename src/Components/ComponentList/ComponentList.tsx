import React from 'react';
import { ComponentItem } from '../ComponentItem/ComponentItem';

interface Props {
  goods: string[];
}

export const ComponentList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <ComponentItem
        good={good}
        key={good}
      />
    ))}
  </ul>
);
