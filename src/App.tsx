import React, { useState } from 'react';
import cn from 'classnames';
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

export const App: React.FC = () => {
  const [isReversed, setIsreversed] = useState(false);
  const [sortType, setSortType] = useState('');

  enum ESortType {
    ALPHABET = 'alphabet',
    LENGTH = 'length',
  }

  function getSortedGoods(
    goods: string[],
    sortField: string,
    isReversedd: boolean,
  ) {
    const goodsCopy = [...goods];

    if (sortType) {
      goodsCopy.sort((a, b) => {
        switch (sortField) {
          case ESortType.ALPHABET:
            return a.localeCompare(b);

          case ESortType.LENGTH:
            return a.length - b.length;

          default:
            return 0;
        }
      });
    }

    if (isReversedd) {
      goodsCopy.reverse();
    }

    return goodsCopy;
  }

  const sortedGoods = getSortedGoods(goodsFromServer, sortType, isReversed);

  const resetButton = () => {
    setSortType('');
    setIsreversed(false);
  };

  const hiddenButton = isReversed || sortType;

  function toggleReverse() {
    setIsreversed(prev => !prev);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortType !== ESortType.ALPHABET },
          )}
          onClick={() => setSortType(ESortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortType !== ESortType.LENGTH },
          )}
          onClick={() => setSortType(ESortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {hiddenButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetButton}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
