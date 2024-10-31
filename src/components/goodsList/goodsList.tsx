import { GoodItem } from '../goodItem/goodItem';

interface Props {
  goods: string[];
}

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodItem good={good} key={good} />
    ))}
  </ul>
);
