import { GoodCard } from '../GoodCard/GoodCard';

export const GoodList = ({ goods }: { goods: string[] }) => (
  <ul>
    {goods.map(good => (
      <GoodCard good={good} key={good} />
    ))}
  </ul>
);
