import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import { GoodsList } from './GoodsList';

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

enum SortField {
  LENGTH = 'length',
  ALPHABETICALLY = 'alphabet',
}

function getPrepared(goods: string[], sortField: string, isReversed: boolean) {
  let preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SortField.LENGTH:
        preparedGoods
          .sort((good1: string, good2: string) => good2.length - good1.length);
        break;
      case SortField.ALPHABETICALLY:
        preparedGoods
          .sort((good1: string, good2: string) => good1.localeCompare(good2));
        break;
      default:
        break;
    }
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, SetIsReversed] = useState(false);

  const visibleGoods = getPrepared(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortField.ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={() => {
            setSortField(SortField.ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortField.LENGTH ? '' : 'is-light'}`}
          onClick={() => {
            setSortField(SortField.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => {
            SetIsReversed(!isReversed);
            getPrepared(goodsFromServer, sortField, isReversed);
          }}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              SetIsReversed(false)
            }}
          >
            Reset
          </button>
        )}
      </div>
      <GoodsList list={visibleGoods} />
    </div>
  );
};
