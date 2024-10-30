import { FC } from 'react';
import { TGoods } from '../utils/types/goodsTypes';

interface IGoodsProps {
  goods: Readonly<TGoods>;
}

const GoodsList: FC<IGoodsProps> = ({ goods }) => (
  <ul>
    {goods.map(el => (
      <li data-cy="Good" key={el}>
        {el}
      </li>
    ))}
  </ul>
);

export default GoodsList;
