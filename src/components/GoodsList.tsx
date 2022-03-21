import React from 'react';
import './GoodsList.scss';

type Props = {
  goods: string[],
  className: string,
};

const GoodsList: React.FC<Props> = ({ goods, className: extendClassName }) => (
  <ul className={`goodsList ${extendClassName}`}>
    {goods.map(good => (
      <li key={good} className="goodsList__item">
        {good}
      </li>
    ))}
  </ul>
);

export default GoodsList;
