import React from 'react';

type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul className="goodsList mb-6">
    {goods.map(good => (
      <li key={good} className="goodsItem">
        {good}
      </li>
    ))}
  </ul>
);
