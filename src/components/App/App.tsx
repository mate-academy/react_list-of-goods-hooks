import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import classNames from 'classnames';
import { GoodsList } from '../GoodsList/GoodsList';

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
  const [sortType, SortFunc] = useState('');
  const [reverse, Reverse] = useState(false);
  const goods = [...goodsFromServer];

  if (reverse) {
    goods.reverse();
  }

  goods.sort((g1: string, g2: string) => {
    switch (sortType) {
      case 'alphabet':
        return g1.localeCompare(g2);

      case 'length':
        return g1.length - g2.length;

      default:
        return 0;
    }
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== 'alphabet' },
          )}
          onClick={() => SortFunc('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortType !== 'length' },
          )}
          onClick={() => SortFunc('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !reverse },
          )}
          onClick={() => {
            Reverse(!reverse);
          }}
        >
          Reverse
        </button>

        {sortType && reverse
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                SortFunc('');
                Reverse(false);
              }}
            >
              Reset
            </button>
          )}
      </div>

      <GoodsList
        goods={goods}
        sortType={sortType}
        reverse={reverse}
      />
    </div>
  );
};
