import React, { useState } from 'react';
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
  DEFAULT = 'default',
  ALPHABETICAL = 'alphabetical',
  LENGTH = 'length',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const handleSortAlphabetically = () => {
    const sortedGoods = [...goodsFromServer].sort();

    if (isReversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSortType(SortType.ALPHABETICAL);
  };

  const handleSortByLength = () => {
    const sortedGoods = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );

    if (isReversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSortType(SortType.LENGTH);
  };

  const handleReverse = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setSortType(SortType.DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABETICAL ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {goods.join() !== goodsFromServer.join() && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
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
