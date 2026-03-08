import React from 'react';

type Props = {
  goods: Good[];
};

type Good = string;

export const ListGoods: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map((good: Good) => {
        return <li data-cy="Good" key={good}>{`${good}`}</li>;
      })}
    </ul>
  );
};
