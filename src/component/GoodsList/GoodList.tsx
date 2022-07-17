import React from 'react';

type Props = {
  goods: string[],
};

export const GoodList: React.FC<Props> = ({ goods }) => {
  return (
    <ul className="goods__list">
      {
        goods.map(good => (
          <li className="goods__item" key={good}>
            {good}
          </li>
        ))
      }
    </ul>
  );
};
