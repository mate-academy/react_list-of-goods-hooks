import { GoodInfo } from './GoodInfo';
import { Good } from './Good';

interface GoodListProps {
  goods: Good[];
}

export const GoodList = ({ goods }: GoodListProps) => (
  <ul>
    {goods.map(good => (
      <GoodInfo key={good} good={good} />
    ))}
  </ul>
);
