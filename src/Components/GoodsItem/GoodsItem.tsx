import React from 'react';

type Props = {
  goodsItem: string;
};

export const GoodsItem: React.FC<Props> = ({ goodsItem }) => {
  return <li>{goodsItem}</li>;
};
