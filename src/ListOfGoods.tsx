import React from 'react';
import './ListOfGoods.css';

type Props = {
  goods: string[],
  select: number,
};

export const ListOfGoods: React.FC<Props> = ({ goods, select }) => {
  return (
    <div className="list">
      <ul>
        {goods.filter(item => item.length >= select).map(item => (
          <li key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfGoods;
