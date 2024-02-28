import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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
  SortAlphabet = 'Sort alphabetically',
  SortLength = 'Sort by length',
  Default = '',
}

function setVisibleGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
): string[] {
  const visibleGoods = [...goods];

  if (sortField) {
    visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SortLength:
          return good1.length - good2.length;
        case SortType.SortAlphabet:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [reverse, setReverse] = useState(false);
  const reverseGood = () => {
    setReverse(!reverse);
  };

  const visibleGoods = setVisibleGoods(goodsFromServer, sortField, reverse);

  const resetGood = () => {
    setSortField(SortType.Default);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons"></div>
      <button
          onClick={() => setSortField(SortType.SortAlphabet)}
          type="button"
          className={`button is-info ${sortField === SortType.SortAlphabet ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.SortLength)}
          type="button"
          className={`button is-success ${sortField === SortType.SortLength ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={reverseGood}
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            onClick={resetGood}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
        {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
