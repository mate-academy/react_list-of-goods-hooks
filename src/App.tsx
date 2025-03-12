import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';
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

enum SortTypes {
  SortByAbc,
  SortByLength
}
export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState<string[]>(goodsFromServer);
  const [reversed, setReversed] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortTypes | null>(null);




  const sortByAbc = () => {
    setVisibleGoods(prevGoods =>
      [...prevGoods].sort((good1, good2) => {
        return !reversed
          ? good1.localeCompare(good2)
          : good2.localeCompare(good1);
      }),);

    setSortType(SortTypes.SortByAbc);
  };

  const sortByLength = () => {
    setVisibleGoods(prevGoods =>
      [...prevGoods].sort((good1, good2) => {
        return !reversed
          ? good1.length - good2.length
          : good2.length - good1.length;
      }),);

    setSortType(SortTypes.SortByLength);
  };

  const toggleReverse = () => {
    setReversed(prev => !prev);
    setVisibleGoods(prevGoods => [...prevGoods].reverse());
  };

  const resetGoods = () => {
    setVisibleGoods(goodsFromServer);
    setReversed(false);
    setSortType(null);

  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortTypes.SortByAbc,
          })}
          onClick={sortByAbc}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SortTypes.SortByLength,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', { 'is-light': !reversed })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(reversed || sortType !== null) && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
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
