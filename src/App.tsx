import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

type Goods = string[];

enum SortType {
  byAlphabet = 'Sort alphabetically',
  byLength = 'Sort by length',
}

export const goodsFromServer: Goods = [
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

function getSortedGoods(goods: Goods, sortType?: SortType): Goods {
  const copiedGoods = [...goods];

  copiedGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.byAlphabet:
        return good1.localeCompare(good2);
      case SortType.byLength:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  return copiedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [reverse, setReverse] = useState(false);

  let visibleGoods = getSortedGoods(goodsFromServer, sortField as SortType);

  if (reverse) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.byAlphabet ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.byAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortField === SortType.byLength ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(reverse || sortField !== '') && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setReverse(false);
              setSortField('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
