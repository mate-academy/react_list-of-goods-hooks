import React from 'react';

type Props = {
  goods: Array<string>
};

export const List: React.FC<Props> = ({ goods }) => {
  return (
    <ul className="app__list">
      {goods.map(good => (
        <li key={good} className="app__list-item">
          {good}
        </li>
      ))}
    </ul>
  );
};
