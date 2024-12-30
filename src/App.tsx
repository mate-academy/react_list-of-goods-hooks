import React, { useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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
  Alphabetically = 'alphabeticaly',
  Length = 'length',
  Reverse = 'reverse',
  Reset = 'reset',
}

export const App: React.FC = () => {
  function setSort(goods: string[], isReverse: boolean, sortMode?: SortType) {
    let sortedGoods = [...goods];

    switch (sortMode) {
      case SortType.Alphabetically:
        sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;

      case SortType.Length:
        sortedGoods.sort((good1, good2) => good1.length - good2.length);
        break;

      case SortType.Reset:
        sortedGoods = [...goodsFromServer];
        break;

      default:
        break;
    }

    if (isReverse) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  }

  const [sortMode, setSortMode] = useState<SortType>(SortType.Reset);
  const [isReverse, setReverse] = useState(false);

  const visibleGoods = useMemo(() => {
    return setSort(goodsFromServer, isReverse, sortMode);
  }, [sortMode, isReverse]);

  const isResetVisible = sortMode !== SortType.Reset || isReverse;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortMode === SortType.Alphabetically
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortMode(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortMode === SortType.Length
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortMode(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReverse ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => setReverse(prev => !prev)}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortMode(SortType.Reset);
              setReverse(false); // Скидання реверсу
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
