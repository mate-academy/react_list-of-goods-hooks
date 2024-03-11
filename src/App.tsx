import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { getPreparedGoods } from './functions';
import { Buttons } from './Components/Buttons/Buttons';
import { SortOptions } from './Types/SortOptions';

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
  const [sortField, setSortField] = useState<SortOptions>(SortOptions.empty);
  const [reverseStatus, setReverseStatus] = useState('');

  const goodsList = getPreparedGoods(goodsFromServer, {
    sortField,
    reverseStatus,
  });

  return (
    <div className="section content">
      <Buttons
        sortField={sortField}
        sortBy={setSortField}
        reverseStatus={reverseStatus}
        reverse={setReverseStatus}
      />

      <ul>
        <ul>
          {goodsList.map(good => {
            return (
              <li data-cy="Good" key={good}>
                {good}
              </li>
            );
          })}
        </ul>
      </ul>
    </div>
  );
};
