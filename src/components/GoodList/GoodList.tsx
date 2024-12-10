import { Good } from '../Good';
import { TPropsGoods } from '../../types';

export const GoodList: React.FC<TPropsGoods> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <Good key={good.internalId} good={good} />
      ))}
    </ul>
  );
};
