import React from 'react';

interface Props {
  goods: string[];
}

const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul className="list-group list-group-flush">
    {goods.map((product) => (
      <li key={product} className="list-group-item">{product}</li>
    ))}
  </ul>
);

export default GoodsList;
