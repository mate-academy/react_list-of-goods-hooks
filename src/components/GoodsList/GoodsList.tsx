import React from 'react';

import './GoodsList.scss';

type Props = {
  goods: Array<string>
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul className="goodsList">
      {goods.map(good => (
        <li key={good} className="goodsList__item">
          {good}
        </li>
      ))}
    </ul>
  );
};
