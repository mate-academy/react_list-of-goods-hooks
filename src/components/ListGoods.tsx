import React from 'react';
import { GoodsWithId } from '../react-app-env';

type Props = {
  goods: GoodsWithId[];
};

export const ListGoods: React.FC<Props> = ({ goods }) => (
  <div className="box m-3">
    <ul>
      {goods.map((item: GoodsWithId) => {
        return (
          <li key={item.id}>
            <strong>id:</strong>
            {' '}
            {item.id}
            {' - '}
            <strong>name:</strong>
            {' '}
            {item.good}
          </li>
        );
      })}
    </ul>
  </div>
);
