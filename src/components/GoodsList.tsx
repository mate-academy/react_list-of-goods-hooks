import React from 'react';
import './GoodsList.css';

type Props = {
  goods: string[],
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <div className="box is-flex is-flex-direction-column
    has-text-centered mx-auto"
  >
    <ul className="block is-flex is-flex-direction-column
      is-align-items-flex-start mx-auto mt-0"
    >
      {goods.map(good => (
        <li key={good}>
          {good}
        </li>
      ))}
    </ul>
  </div>
);
