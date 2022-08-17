import React from 'react';
import './GoodsList.scss';

type Props = {
  goods: string[]
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <div className="goods">
      <ul className="goods__list">
        {goods.map((good, index) => (
          <li key={good} className="goods__item">
            <p className="heading goods__heading">{index + 1}</p>
            <p className="title goods__title">{good}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
