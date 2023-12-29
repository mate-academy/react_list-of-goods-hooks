import { GoodType } from '../../Types/GoodType';
import { Good } from '../Good/Good';

export type PropsGoodList = {
  goods: GoodType[];
};

export const GoodList: React.FC<PropsGoodList> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <Good good={good} key={good} />
      ))}
    </ul>
  );
};
