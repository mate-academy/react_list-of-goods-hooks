import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

enum SortBy {
  Default,
  Alphabet,
  Length,
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortBy, setSortBy] = useState(SortBy.Default);
  const [reversed, setReversed] = useState(false);

  function sortGoods(type:number, isReversed = false) {
    const sortedGoods = [...goodsFromServer];

    switch (type) {
      case SortBy.Length: {
        sortedGoods.sort(
          (g1, g2) => g1.length - g2.length,
        );
        break;
      }

      case SortBy.Alphabet:
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;

      default:
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
  }

  useEffect(() => {
    sortGoods(sortBy, reversed);
  }, [reversed, sortBy]);

  const reversedSort = () => {
    setReversed(!reversed);
  };

  const reset = () => {
    setReversed(false);
    setSortBy(SortBy.Default);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortBy !== SortBy.Alphabet })}
          onClick={() => {
            setSortBy(SortBy.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortBy !== SortBy.Length })}
          onClick={() => {
            setSortBy(SortBy.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reversed })}
          onClick={reversedSort}
        >
          Reverse
        </button>

        {reversed || sortBy !== SortBy.Default ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        ) : <></>}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
