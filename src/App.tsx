import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Alphabetical = 'alphabetical',
  Length = 'length',
  Reverse = 'reverse',
}

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

export const App: React.FC = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [activeButton, setActiveButton] = useState<SortType | null>(null);
  const [resetVisible, setResetVisible] = useState(false);

  const handleSortAlphabetically = () => {
    const sortedGoods = [...goods].sort();

    setGoods(sortedGoods);
    setActiveButton(SortType.Alphabetical);
    setResetVisible(true);
  };

  const handleSortByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => a.length - b.length);

    setGoods(sortedGoods);
    setActiveButton(SortType.Length);
    setResetVisible(true);
  };

  const handleReverse = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setActiveButton(SortType.Reverse);
    setResetVisible(true);
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setActiveButton(null);
    setResetVisible(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeButton === SortType.Alphabetical ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeButton === SortType.Length ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${activeButton === SortType.Reverse ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {resetVisible && (
          <button
            type="button"
            className={`button is-danger ${activeButton === null ? '' : 'is-light'}`}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
