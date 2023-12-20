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

// const SORT_BY_ALPHABET = 'alphabet';
// const SORT_BY_LENGTH = 'length';
// const RESET = 'reset';

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
  Reset = 'reset',
}

function getPreparedGoods(
  goods: string[],
  sortFilter: SortType,
  reverseOrder: boolean,
) {
  const sortedGoods = [...goods];

  sortedGoods.sort((good1, good2) => {
    switch (sortFilter) {
      case SortType.Alphabet: {
        return good1.localeCompare(good2);
      }

      case SortType.Length:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  return !reverseOrder ? sortedGoods : sortedGoods.reverse();
}

export const App: React.FC = () => {
  const [sortFilter, setSortFilter] = useState<SortType>(SortType.Reset);
  const [reverseOrder, setReverseOrder] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortFilter,
    reverseOrder,
  );

  function toggleReverse() {
    setReverseOrder(!reverseOrder);
  }

  function handleReset() {
    setSortFilter(SortType.Reset);
    setReverseOrder(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            'is-light': sortFilter !== SortType.Alphabet,
          }, 'button is-info')}
          onClick={() => setSortFilter(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            'is-light': sortFilter !== SortType.Length,
          }, 'button is-success')}
          onClick={() => setSortFilter(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            'is-light': !reverseOrder,
          }, 'button is-warning')}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {JSON.stringify(visibleGoods) === JSON.stringify(goodsFromServer)
          ? '' : (
            <button
              type="button"
              className={cn({
                'is-light': sortFilter !== SortType.Reset,
              }, 'button is-danger')}
              onClick={handleReset}
            >
              Reset
            </button>
          )}
      </div>
      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>

  );
};
