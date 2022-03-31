import React from 'react';
import { Good } from '../../types/Good';

import './GoodsList.scss';

type Props = {
  goods: Good[];
};

const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <div className="goods">
      <ul className="goods__list">
        {goods.map((good) => {
          return (
            <li className="goods__item" key={good.id}>
              {good.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(GoodsList);
