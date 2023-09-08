import { FC } from 'react';

import { IGoods } from '../../types/Goods';

type TGoodsProps = {
  product: IGoods;
};

export const Goods: FC<TGoodsProps> = ({ product }) => (
  <li data-cy="Good">{product.name}</li>
);
