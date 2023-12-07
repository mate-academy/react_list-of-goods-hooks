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

enum SortType {
  Alphabet = 'alphabet',
  Lenghth = 'length',
  None = '',
}

function sortByType(goods:string[], query:string, isReversed:boolean) {
  const prepGoods = [...goods];

  if (query) {
    switch (query) {
      case SortType.Alphabet:
        prepGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.Lenghth:
        prepGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }
  }

  if (isReversed) {
    prepGoods.reverse();
  }

  return prepGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.None);
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods = sortByType(goodsFromServer, sortType, isReversed);

  const sortByAlphabet = () => {
    setSortType(SortType.Alphabet);
  };

  const sortByLength = () => {
    setSortType(SortType.Lenghth);
  };

  const reversed = () => {
    setIsReversed(hasState => !hasState);
  };

  const reset = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortType !== SortType.Alphabet })}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortType !== SortType.Lenghth })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={reversed}
        >
          Reverse
        </button>

        {(sortType || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          )}
      </div>

      {sortedGoods.map(good => (
        <li key={good} data-cy="Good">{good}</li>
      ))}
    </div>
  );
};
