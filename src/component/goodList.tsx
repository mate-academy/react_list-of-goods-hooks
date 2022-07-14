import React from 'react';

type Props = {
  goods: string[],
};

export const GoodList: React.FC<Props> = ({ goods }) => (
  <>
    <h1 className="title">Goods list</h1>
    <div className="goodList">

      {goods.length === 0
        ? ('Oops...It seems there are no products in the list')
        : (goods.map(good => (
          <ul className="goodList__good" key={good}>
            <li>{good}</li>
          </ul>
        )))}
    </div>
  </>

);
