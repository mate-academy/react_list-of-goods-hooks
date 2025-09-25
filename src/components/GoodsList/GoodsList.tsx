import { GoodsItem } from '../GoodsItem';
import React from 'react';

type Props = {
  list: string[];
};

export const GoodsList: React.FC<Props> = ({ list }: Props) => {
  return (
    <ul>
      {list.map((item: string, index: number) => (
        <GoodsItem key={`${item.split(' ').join('-')}-${index}`} item={item} />
      ))}
    </ul>
  );
};
