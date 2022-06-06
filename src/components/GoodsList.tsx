import React from 'react';

type Props = {
  goods: string[]
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <>
    <ul>
      {goods.map((el: string) => (
        <li key={el}>{el}</li>
      ))}
    </ul>
  </>
);
