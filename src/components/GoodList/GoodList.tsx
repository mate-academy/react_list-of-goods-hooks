import React from 'react';
import { GoodItem } from '../GoodItem';

type Props = {
  goodsFromServer: string[];
};

export const GoodList: React.FC<Props> = ({ goodsFromServer }) => {
  return (
    <ul>
      {goodsFromServer.map(el => (
        <GoodItem el={el} key={el} />
      ))}
    </ul>
  );
};
