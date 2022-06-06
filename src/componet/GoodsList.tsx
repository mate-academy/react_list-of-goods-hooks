import React from 'react';

type Props = {
  goods: string[]
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <div>
      {goods.map(item => (
        <li key={item}>
          {item}
        </li>
      ))}
    </div>
  );
};
