import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodsList';

enum SortType {
  alphabetically = 'alphabetically',
  byLength = 'length',
  defaultValue = '',
}

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

function getSortGoods(goods: string[], sortField: SortType) {
  const visibleGoods = [...goods];

  if (sortField) {
    visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.alphabetically:
          return good1.localeCompare(good2);
        case SortType.byLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.defaultValue);
  const [reversed, setReversed] = useState(false);

  let visibleGoods = getSortGoods(goodsFromServer, sortField);

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SortType.alphabetically);
            setReversed(false);
          }}
          type="button"
          className={
            sortField === SortType.alphabetically
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SortType.byLength);
            setReversed(false);
          }}
          type="button"
          className={
            sortField === SortType.byLength
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(prev => !prev)}
          type="button"
          className={reversed ? 'button is-info' : 'button is-info is-light'}
        >
          Reverse
        </button>

        {sortField && (
          <button
            onClick={() => {
              setReversed(false);
              setSortField(SortType.defaultValue);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
