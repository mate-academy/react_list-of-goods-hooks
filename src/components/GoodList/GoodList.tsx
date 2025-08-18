import * as React from 'react';

interface GoodsListProps {
  goods: string[];
}

const GoodsList: React.FC<GoodsListProps> = ({ goods }) => (
  <ul className="GoodList">
    {goods.map(good => (
      <li key={good} className="Good" data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);

export default GoodsList;
