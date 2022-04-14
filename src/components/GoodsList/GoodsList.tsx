import React, { memo } from 'react';
import './GoodsList.scss';

type Props = {
  goods: string[],
};

const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul className="list">
      {goods.map(good => (
        <li className="list__item" key={good}>{good}</li>
      ))}
    </ul>
  );
};

export default memo(GoodsList);
