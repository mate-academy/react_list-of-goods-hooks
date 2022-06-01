import React from 'react';
import './Goods.scss';

type Props = {
  goods: string[],
};

const Goods: React.FC<Props> = ({ goods }) => {
  return (
    <ul className="goods__list">
      {
        goods.map(good => (
          <li key={good} className="goods__item">
            {good}
          </li>
        ))
      }
    </ul>
  );
};

export default React.memo(Goods);
