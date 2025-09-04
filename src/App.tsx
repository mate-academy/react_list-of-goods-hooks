import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './components/GoodList';
import { GoodType } from './types/GoodType';

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

enum SortType {
  DEFAULT = 'default',
  ASC = 'asc',
  LENGTH = 'length',
}

function getPreparedGoods(goods: GoodType[], sortField: SortType) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.DEFAULT:
          return 0;
        case SortType.ASC:
          return good1.localeCompare(good2);
        case SortType.LENGTH:
          return good1.length - good2.length;
      }
    });
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [reversed, setReversed] = useState(false);

  let visibleGoods = getPreparedGoods(goodsFromServer, sortField);

  const handleReset = () => {
    visibleGoods = getPreparedGoods(goodsFromServer, SortType.DEFAULT);
    setSortField(SortType.DEFAULT);
    setReversed(false);
  };

  const isModified = sortField !== SortType.DEFAULT || reversed;

  const appliedSortField = (field: SortType) => {
    return sortField !== field ? 'is-light' : '';
  };

  const appliedReversed = () => {
    return !reversed ? 'is-light' : '';
  };

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${appliedSortField(SortType.ASC)}`}
          onClick={() => setSortField(SortType.ASC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${appliedSortField(SortType.LENGTH)}`}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${appliedReversed()}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
