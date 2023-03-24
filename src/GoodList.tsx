import React from 'react';

type Props = {
  goods: string[]
};

const GoodList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map((good) => {
        return <li key={good} data-cy="Good">{good}</li>;
      })}
    </ul>
  );
};

export default GoodList;
