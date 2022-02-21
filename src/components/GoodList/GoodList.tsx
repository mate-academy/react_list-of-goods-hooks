import React from 'react';
import './GoodList.scss';

type Props = {
  goods: string[];
};

export const GoodList: React.FC<Props> = ({ goods }) => {
  return (
    <div className="goods">
      <ul className="goods__list">
        {goods.map((good) => {
          return (
            <li className="goods__list-item" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
