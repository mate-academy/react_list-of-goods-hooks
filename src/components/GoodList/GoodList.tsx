import { GoodCard } from '../GoodCard/GoodCard';

interface List {
  goods: string[];
}

export const GoodList: React.FC<List> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodCard good={good} key={good} />
    ))}
  </ul>
);
