import { FC } from 'react';
import { IGoods } from '../../types/Goods';

import { Goods } from '../Goods';

type TGoodsListProps = {
  goods: IGoods[]
};

export const GoodsList: FC<TGoodsListProps> = ({ goods }) => (
  <ul>
    {goods.map(product => <Goods key={product.key} product={product} />)}
  </ul>
);
