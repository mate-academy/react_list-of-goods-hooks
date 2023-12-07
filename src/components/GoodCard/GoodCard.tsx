import React from 'react';

type Props = {
  good: string;
};

const GoodGard: React.FC<Props> = ({ good }) => (
  <li data-cy="Good">
    {good}
  </li>
);

export default GoodGard;
