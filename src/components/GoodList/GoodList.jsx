import { GoodCard } from '../GoodCard';

export const GoodList = ({ goods }) => (
  <>
    {goods.map(good => (
      <GoodCard good={good} key={good} />
    ))}
  </>
);
