import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
import classNames from 'classnames';

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
type GoodsProps = {
  goods: string[];
};
export const Goods: React.FC<GoodsProps> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li key={good} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);

export const App: React.FC = () => {
  enum SortType {
    None = '',
    Alphabetically = 'alphabetically',
    ByLength = 'length',
  }
  const [sortField, setSortField] = useState<SortType>(SortType.None);

  const [reversed, setReversed] = useState(false);

  const sortAlphabetically = () => setSortField(SortType.Alphabetically);
  const sortByLength = () => setSortField(SortType.ByLength);
  const toggleReverse = () => setReversed(prev => !prev);

  const resetGoods = () => {
    setSortField(SortType.None);
    setReversed(false);
  };

  const getVisibleGoods = (): string[] => {
    const goods = [...goodsFromServer];

    if (sortField === SortType.Alphabetically) {
      goods.sort((a, b) => a.localeCompare(b));
    }

    if (sortField === SortType.ByLength) {
      goods.sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      goods.reverse();
    }

    return goods;
  };

  const visibleGoods = getVisibleGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortAlphabetically}
          className={classNames('button is-info', {
            'is-light': sortField !== 'alphabetically',
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          // className="button is-success is-light"
          className={classNames('button is-success', {
            'is-light': sortField !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={toggleReverse}
          // className="button is-warning is-light"
          className={classNames('button is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            onClick={resetGoods}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <Goods goods={visibleGoods} />
    </div>
  );
};
