import { createRandomId } from '../utils/createRandomId';
import { Good } from './Good';

type GoodsListProps = {
  goods: string[];
};

export const GoodsList: React.FC<GoodsListProps> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <Good goodName={good} key={createRandomId()} />
      ))}
    </ul>
  );
};
