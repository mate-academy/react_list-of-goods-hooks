import React from 'react';
import './GoodsList.scss';

type Props = {
  goods: string[],
};

export const GoodsList:React.FC<Props> = ({ goods }) => {
  return (
    <ul className="list">
      {goods.map(good => (
        <li key={good} className="list-item is-size-3 is-narrow">
          {good}
        </li>
      ))}
    </ul>
  );
};
