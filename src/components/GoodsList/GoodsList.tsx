import { Goods } from '../../types/Goods';
import { Good } from '../Good';

type Props = {
  goods: Goods;
};

/* eslint-disable react/jsx-key */
export function GoodsList({ goods }: Props) {
  return (
    <ul>
      <ul>
        {goods.map(good => (
          <Good item={good} />
        ))}
      </ul>
    </ul>
  );
}
/* eslint-enable react/jsx-key */
