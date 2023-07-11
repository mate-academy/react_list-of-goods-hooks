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

function getReorderedGoods(
  goods: string[], sortBy: string, isReversed: boolean,
):string[] {
  const visibleGoods = [...goods];

  visibleGoods.sort((a, b) => {
    switch (sortBy) {
      case 'alphabet':
        return (a.localeCompare(b));

      case 'length':
        return (a.length - b.length);

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState('none');
  const [isReversed, setReverse] = useState(false);

  const sortByLength = () => {
    setSortType('length');
  };

  function sortByAlphabet() {
    setSortType('alphabet');
  }

  const reverse = () => {
    setReverse(!isReversed);
  };

  function reset() {
    setSortType('none');
    setReverse(false);
  }

  const isAlphabet = sortType === 'alphabet';
  const isLength = sortType === 'length';
  const hideReset = sortType === 'none' && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={isAlphabet
            ? 'button is-info'
            : 'button is-info is-light'}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={isLength
            ? 'button is-success'
            : 'button is-success is-light'}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={isReversed
            ? 'button is-warning'
            : 'button is-warning is-light'}
          onClick={reverse}
        >
          Reverse
        </button>

        {hideReset
          ? ''
          : (
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
        {getReorderedGoods(goodsFromServer, sortType, isReversed)
          .map((good) => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
      </ul>
    </div>
  );
};
