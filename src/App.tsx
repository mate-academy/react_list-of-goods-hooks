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
  NONE = '',
  ALPHABETICAL = 'alphabetical',
  LENGTH = 'length',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const sortAlphabetically = () => {
    const sorted = [...goodsFromServer].sort((a, b) =>
      a.localeCompare(b),
    );

    setGoods(isReversed ? sorted.reverse() : sorted);
    setSortType(SortType.ALPHABETICAL);
  };

  const sortByLength = () => {
    const sorted = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );

    setGoods(isReversed ? sorted.reverse() : sorted);
    setSortType(SortType.LENGTH);
  };

  const reverse = () => {
    setGoods(currentGoods => [...currentGoods].reverse());
    setIsReversed(currentReversed => !currentReversed);
  };

  const reset = () => {
    setGoods(goodsFromServer);
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const isOriginal =
    goods.length === goodsFromServer.length &&
    goods.every((good, index) => good === goodsFromServer[index]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.ALPHABETICAL ? '' : 'is-light'
          }`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === SortType.LENGTH ? '' : 'is-light'
          }`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {!isOriginal && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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
