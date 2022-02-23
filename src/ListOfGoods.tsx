import React from 'react';
import './ListOfGoods.css';

type Props = {
  goods: string[],
};

export const ListOfGoods: React.FC<Props> = ({ goods }) => {
  return (
    <div className="list">
      <ul>
        {goods.map(item => (
          <li key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfGoods;
