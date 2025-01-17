import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useEffect } from 'react';

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
  None = '',
  Alphabetically = 'alphabetically',
  ByLength = 'byLength',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const modifyGoods = (
    array: Array<string>,
    SORT_TYPE: SortType,
    ORDER: 'asc' | 'desc',
  ): string[] => {
    const modifiedArray = [...array];

    if (SORT_TYPE === SortType.Alphabetically) {
      modifiedArray.sort((a, b) => a.localeCompare(b));
    } else if (SORT_TYPE === SortType.ByLength) {
      modifiedArray.sort((a, b) => a.length - b.length);
    }

    if (ORDER === 'desc') {
      modifiedArray.reverse();
    }

    return modifiedArray;
  };

  useEffect(() => {
    setGoods(modifyGoods(goodsFromServer, sortType, order));
  }, [sortType, order]);

  const clickSortAlphabetically = () => setSortType(SortType.Alphabetically);
  const clickSortByLength = () => setSortType(SortType.ByLength);
  const clickReverse = () =>
    setOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  const clickReset = () => {
    setSortType(SortType.None);
    setOrder('asc');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabetically' ? '' : 'is-light'}`}
          onClick={clickSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'byLength' ? '' : 'is-light'}`}
          onClick={clickSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${order === 'desc' ? '' : 'is-light'}`}
          onClick={clickReverse}
        >
          Reverse
        </button>

        {(sortType || order !== 'asc') && (
          <button
            type="button"
            className="button is-danger"
            onClick={clickReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
