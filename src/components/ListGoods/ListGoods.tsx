//.. ListGoods
import { Good } from '../Good/Good';

type ListGoodsProps = {
  goods: string[];
};

export const ListGoods = ({ goods }: ListGoodsProps) => {
  return (
    <ul>
      {goods.map(el => {
        return <Good el={el} key={el} />;
      })}
    </ul>
  );
};
