import React from 'react';
import 'bulma/css/bulma.css';

interface Props {
  goods: string[],
}

export const Goods = React.memo<Props>(
  ({ goods }) => (
    <ul>
      {goods.map(good => (
        <li data-cy="Good" key={good}>
          { good }
        </li>
      ))}
    </ul>
  ),
);
