import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsListWrapper } from './components/goodsListWrapper';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App: React.FC = () => {
  return (
    <div className="section content">
      <GoodsListWrapper goods={goodsFromServer} />
    </div>
  );
};
