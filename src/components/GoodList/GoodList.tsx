import { GoodCard } from '../GoodCard/GoodCard';

interface Props {
  goods: string[];
}

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return goods.map(good => <GoodCard key={good} good={good} />);
};
