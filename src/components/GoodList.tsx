import { GoodCart } from './GoodCart';

type Props = {
  goods: string[]
};

export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodCart good={good} key={good} />
    ))}
  </ul>
);
