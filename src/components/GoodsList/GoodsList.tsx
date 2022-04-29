import React from 'react';
import './GoodsList.scss';

type ArrayOfGoods = {
  goods: string[],
  lengthForDisplay: number,
};

const GoodsList: React.FC<ArrayOfGoods> = ({ goods, lengthForDisplay }) => (
  <>
    {goods.map(good => {
      return (
        <li
          className="GoodsList-item"
          hidden={good.length > lengthForDisplay}
          key={good}
        >
          {good}
        </li>
      );
    })}
  </>
);

export default GoodsList;
