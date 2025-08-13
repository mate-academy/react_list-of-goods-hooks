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
  alphabet = 'alphabet',
  length = 'length',
  default = '',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState<SortType>(SortType.default);
  const [isReversed, setIsReversed] = useState(false);

  const handleSortAlphabet = () => {
    setGoods(prev => [...prev].sort((a, b) => a.localeCompare(b)));
    setSortType(SortType.alphabet);
  };

  const handleSortLength = () => {
    setGoods(prev => [...prev].sort((a, b) => a.length - b.length));
    setSortType(SortType.length);
  };

  const handleReverse = () => {
    setGoods(prev => [...prev].reverse());
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setGoods(goodsFromServer);
    setSortType(SortType.default);
    setIsReversed(false);
  };

  const showResetButton = sortType !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSortAlphabet}
          type="button"
          className={`button is-info ${sortType === SortType.alphabet ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSortLength}
          type="button"
          className={`button is-info ${sortType === SortType.length ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
