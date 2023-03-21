import React from 'react';

type Props = {
  goods: string[],
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map((good) => {
        return (
          <li>{good}</li>
        );
      })}
    </ul>
  );
};
