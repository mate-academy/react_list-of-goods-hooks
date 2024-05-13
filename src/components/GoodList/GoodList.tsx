import { GoodCard } from '../GoodCard';
import { GoodType } from '../../types/GoodType';

interface Props {
  goods: GoodType[];
}

export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodCard good={good} key={good} />
    ))}
  </ul>
);
