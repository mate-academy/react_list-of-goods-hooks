import React from 'react';

type Props = {
  goods: string[];
};

const GoodList: React.FC<Props> = ({ goods }) => (
  <u>
    {goods.map(good => (
      <li data-cy="Good" key={good}>
        {good}
      </li>
    ))}
  </u>
);

export default GoodList;
