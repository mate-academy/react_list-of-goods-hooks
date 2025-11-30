import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';
import { Good } from './types/Good';
import { SortType } from './types/SortType';

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

function sortAlphabetically(goods: Good[], reversed = false) {
  const sorted = [...goods].sort();

  return reversed ? sorted.reverse() : sorted;
}

function sortByLength(goods: Good[], reversed = false) {
  return reversed
    ? [...goods].sort((a, b) => b.length - a.length)
    : [...goods].sort((a, b) => a.length - b.length);
}

function reverse(goods: Good[]) {
  return [...goods].reverse();
}

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);
  const [goods, setGoods] = useState(goodsFromServer);
  const initialGoods = [...goodsFromServer];

  const handleSortAlphabetically = () => {
    setSortField(SortType.Alphabetically);
    setIsReversed(false);
    const sorted = sortAlphabetically([...goodsFromServer]);

    setGoods(sorted);
  };

  const handleSortByLength = () => {
    setSortField(SortType.ByLength);
    setIsReversed(false);
    const sorted = sortByLength([...goodsFromServer]);

    setGoods(sorted);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
    setGoods(reverse([...goods]));
  };

  const handleReset = () => {
    setSortField(SortType.Default);
    setIsReversed(false);
    setGoods([...initialGoods]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.Alphabetically,
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SortType.ByLength,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {JSON.stringify(goods) !== JSON.stringify(initialGoods) && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
      {goods.map(good => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </div>
  );
};
