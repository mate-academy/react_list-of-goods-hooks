import React from 'react';

type Props = {
  goods: string[];
};

export const List: React.FC<Props> = ({ goods }) => {
  return goods.map(good => (
    <li data-cy="Good" key={good}>
      {good}
    </li>
  ));
};
