import React from 'react';

type Props = {
  goodsArray: string[],
};

export const GoodsList: React.FC<Props> = ({ goodsArray }) => {
  return (
    <ul className="app__list">
      {goodsArray.map(good => (
        <li className="app__item" key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
};
