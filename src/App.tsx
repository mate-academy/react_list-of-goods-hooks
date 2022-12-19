import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classnames from 'classnames';

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
  None,
  Alphabet,
  Length,
}

export const App: React.FC = () => {
  const visibleGoods = [...goodsFromServer];
  const [sortType, setSortType] = useState(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  visibleGoods.sort((a, b): SortType => {
    switch (sortType) {
      case SortType.Length:
        return a.length - b.length;

      case SortType.Alphabet:
        return a.localeCompare(b);

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  const handleSortAlphabetically = () => {
    setSortType(SortType.Alphabet);
  };

  const handleSortByLength = () => {
    setSortType(SortType.Length);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleSReset = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classnames('button', 'is-info',
            sortType !== SortType.Alphabet && 'is-light')}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classnames('button', 'is-success',
            sortType !== SortType.Length && 'is-light')}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classnames('button', 'is-warning',
            !isReversed && 'is-light')}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {
          (sortType !== SortType.None || isReversed) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={handleSReset}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {
          visibleGoods.map((good) => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
