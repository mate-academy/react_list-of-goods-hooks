import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
  goods: string[],
};

const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul className="mb-2 bg-success p-2 text-white bg-opacity-75">
      {goods.map(good => (
        <li key={good} className="text-center border border-dark">
          {good}
        </li>
      ))}
    </ul>
  );
};

export default GoodsList;
