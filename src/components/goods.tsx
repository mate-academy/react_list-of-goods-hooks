import React from 'react';

type Props = {
  goods: string[];
};

const Goods: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <li key={good} data-cy="Good">{good}</li>
      ))}
    </ul>
  );
};

export default React.memo(Goods);
