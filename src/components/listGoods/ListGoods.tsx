import 'bulma/css/bulma.css';
import React from 'react';

interface Props {
  goods: string[];
}

export const ListGoods: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <li key={good} data-cy="Good">
          {good}
        </li>
      ))}
    </ul>
  );
};
