import 'bulma/css/bulma.css';
import { useState } from 'react';
import classNames from 'classnames';

import './App.scss';
import { goodsFromServer } from './api/goodsFromServer';
import { SortType } from './enums/sortingEnum';

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [activeSort, setActiveSort] = useState<SortType | ''>('');
  const [isReversed, setIsReversed] = useState(false);

  const sortGoods = (compareFunction: (a: string, b: string) => number) => {
    const sortedGoods = [...goods].sort(compareFunction);

    setGoods(sortedGoods);
  };

  const sort = (typeOfSortGoods: SortType) => {
    let compareFunction;

    switch (typeOfSortGoods) {
      case SortType.Alphabetically:
        compareFunction = (a: string, b: string) => {
          return isReversed ? b.localeCompare(a) : a.localeCompare(b);
        };

        setActiveSort(SortType.Alphabetically);
        break;

      case SortType.ByLength:
        compareFunction = (a: string, b: string) => {
          return isReversed ? b.length - a.length : a.length - b.length;
        };

        setActiveSort(SortType.ByLength);
        break;

      default:
        throw new Error(`Unknown sort type: ${typeOfSortGoods}`);
    }

    sortGoods(compareFunction);
  };

  const reverseGoods = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(prevIsReversed => !prevIsReversed);
  };

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
    setIsReversed(false);
    setActiveSort('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': activeSort !== SortType.Alphabetically,
          })}
          onClick={() => sort(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': activeSort !== SortType.ByLength,
          })}
          onClick={() => sort(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', {
            'is-warning': isReversed,
            'is-warning is-light': !isReversed,
          })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(activeSort !== '' || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
