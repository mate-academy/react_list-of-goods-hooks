import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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

export const App = () => {
  const [sortType, setSortType] = useState('default');
  const [isReversed, setIsReversed] = useState(false);

  const getSortedGoods = () => {
    const sortedGoods = [...goodsFromServer];

    if (sortType === 'alphabet') {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortType === 'length') {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const handleSortAlphabetically = () => {
    setSortType('alphabet');
  };

  const handleSortByLength = () => {
    setSortType('length');
  };

  const handleReverse = () => {
    setIsReversed(prevState => !prevState);
  };

  const handleReset = () => {
    setSortType('default');
    setIsReversed(false);
  };

  const isActive = sortType !== 'default' || isReversed;
  const sortedGoods = getSortedGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
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

        {isActive && (
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
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
