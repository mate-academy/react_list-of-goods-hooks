import React from 'react';

type Props = {
  goods: string[],
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul className="Goods">
      {goods.map((product) => (
        <li
          className="Goods__item"
          key={product}
        >
          {product}
        </li>
      ))}
    </ul>
  );
};
