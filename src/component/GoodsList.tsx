import React from 'react';

type Props = {
  goodsList: string[],
};

export const GoodsList: React.FC<Props> = (props) => {
  const { goodsList } = props;

  return (
    <ul>
      {goodsList.map(good => (
        <li data-cy="Good" key={good}>{good}</li>
      ))}
    </ul>
  );
};
