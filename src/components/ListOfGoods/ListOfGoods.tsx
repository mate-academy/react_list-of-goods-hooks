import { FC } from 'react';
import './ListOfGoods.scss';

type Props = {
  goods: string[],
};

export const ListOfGoods: FC<Props> = ({ goods }) => (
  <ul className="goods-list">
    {
      goods.map(good => (
        <li
          key={good}
        >
          {good}
        </li>
      ))
    }
  </ul>
);
