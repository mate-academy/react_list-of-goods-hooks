import React, { useState } from 'react';
import classNames from 'classnames';
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
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const reverse = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.classList.toggle('is-light');
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    return (
      setSortType(SortType.NONE),
      setIsReversed(false)
    );
  };

  const visibleGoods = [...goodsFromServer];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return good1.localeCompare(good2);
      case SortType.LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames('button is-info',
              {
                'is-light': sortType !== SortType.ALPHABET,
              })
          }
          onClick={() => (setSortType(SortType.ALPHABET))}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames('button is-success',
              {
                'is-light': sortType !== SortType.LENGTH,
              })
          }
          onClick={() => (setSortType(SortType.LENGTH))}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames('button is-warning',
              {
                'is-light': !isReversed,
              })
          }
          onClick={reverse}
        >
          Reverse
        </button>

        { (sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
