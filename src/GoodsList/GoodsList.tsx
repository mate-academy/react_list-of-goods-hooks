import React from 'react';
import './GoodsList.scss';

type Props = {
  goods: string[]
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <>
      <ul className="list">
        <h2>List of goods:</h2>
        {goods.map(good => (
          <li key={good} className="list__item">
            <span>{good}</span>
            <span>{`length: ${good.length}`}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
