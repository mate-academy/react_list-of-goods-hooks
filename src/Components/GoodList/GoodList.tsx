import { GoodCard } from '../GoodCard/GoodCard';

type Props = {
  goods: string[]
};

export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodCard good={good} key={good} />
    ))}
  </ul>
);
