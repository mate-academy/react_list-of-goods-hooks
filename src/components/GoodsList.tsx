import React from 'react';

type Props = {
  goodslist: string[],
};

export const GoodsList: React.FC<Props> = ({ goodslist }) => {
  return (
    <ul className="list">
      {goodslist.map((good) => (
        <li className="list__item">
          {good}
        </li>
      ))}
    </ul>
  );
};
