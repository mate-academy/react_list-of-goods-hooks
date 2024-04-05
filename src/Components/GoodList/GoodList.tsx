import './GoodList.scss';
import { GoodCard } from '../GoodCard/GoodCard';

interface Props {
  goods: string[];
}

export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul className="GoodList">
    {goods.map(good => (
      <GoodCard key={goods.indexOf(good)} good={good} />
    ))}
  </ul>
);
