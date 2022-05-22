import { Good } from '../types';
import './GoodsList.scss';

type Props = {
  goods: Good[],
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul className="goodslist">
    {goods.map(good => (
      <li className="goodslist__item" key={good.id}>
        {good.name}
      </li>
    ))}
  </ul>
);
