import React from 'react';

type Props = {
  item: string;
};

export const GoodsItem: React.FC<Props> = ({ item }: Props) => {
  return <li data-cy="Good">{item}</li>;
};
