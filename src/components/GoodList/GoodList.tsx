import React from 'react';
import './GoodList.scss';

type Props = {
  goods: string[];
};

export const GoodList: React.FC<Props> = ({ goods }) => {
  return (
    <div className="goods">
      <ul className="goods__list">
        {goods.map((good, index) => {
          const id = index + 1;

          return (
            <li className="goods__list-item" key={id}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
