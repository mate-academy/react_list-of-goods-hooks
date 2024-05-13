import React from 'react';
import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

import { GoodList } from './components/GoodList';
import { SortType } from './types/SortType';
import { GoodType } from './types/GoodType';

export const goodsFromServer: GoodType[] = [
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

const getPreperdGoods = (
  goods: GoodType[],
  sortField: SortType,
  reversed: boolean,
): GoodType[] => {
  const preperdGoods = [...goods];

  preperdGoods.sort((goodOne: GoodType, goodSecend: GoodType) => {
    switch (sortField) {
      case SortType.ALPHABETICALLY:
        return goodOne.localeCompare(goodSecend);

      case SortType.LENGTH:
        return goodOne.length - goodSecend.length;

      default:
        return SortType.DEFAULT;
    }
  });

  return reversed ? preperdGoods.reverse() : preperdGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreperdGoods(goodsFromServer, sortField, reversed);

  const resetGoods = () => {
    setSortField(SortType.DEFAULT);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.ALPHABETICALLY)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(!reversed)}
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            onClick={resetGoods}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
