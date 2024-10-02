import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import classNames from 'classnames';
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
  default = 0,
}

// type SortConfig = {
//   type: string | null;
//   reversed: boolean;
// };

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [reversed, setReversed] = useState('');

  function getSortedList(
    goods: string[],
    sortBy: string,
    isReverse: string | boolean,
  ) {
    const sortedList = [...goods].sort((good1, good2) => {
      switch (sortBy) {
        case SortType.alphabet:
          return good1.localeCompare(good2);
        case SortType.length:
          return good1.length - good2.length;
        default:
          return SortType.default;
      }
    });

    return isReverse ? sortedList.reverse() : sortedList;
  }

  const reset = () => {
    setReversed('');
    setSortType('');
  };

  const visibleGoods = getSortedList(goodsFromServer, sortType, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.alphabet)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.alphabet,
          })}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortType(SortType.length)}
          type="button"
          className={classNames('button', 'is-succes', {
            'is-light': sortType !== SortType.length,
          })}
        >
          Sort by length
        </button>
        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>
        {(sortType.length || reversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
