import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classN from 'classnames';

export enum SortType {
  None = 'none',
  Alphabet = 'alphabet',
  Length = 'length',
}

export const goodsFromServer: string[] = [
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

function prepareGoods(
  goods: string[],
  { sortType, reverse }: { sortType: SortType; reverse: boolean },
): string[] {
  const preparedGoods = [...goods];

  if (sortType === SortType.Alphabet) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.Length) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [reverse, setReverse] = useState(false);

  const visibleGoods = prepareGoods(goodsFromServer, { sortType, reverse });

  function handleSortByAlphabet() {
    setSortType(prev =>
      prev === SortType.Alphabet ? SortType.None : SortType.Alphabet,
    );
  }

  function handleSortByLength() {
    setSortType(prev =>
      prev === SortType.Length ? SortType.None : SortType.Length,
    );
  }

  function handleReverse() {
    setReverse(prev => !prev);
  }

  function resetSorting() {
    setSortType(SortType.None);
    setReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleSortByAlphabet}
          className={classN('button', 'is-info', {
            'is-light': sortType !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleSortByLength}
          className={classN('button', 'is-info', {
            'is-light': sortType !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={classN('button', 'is-warning', {
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || reverse) && (
          <button
            type="button"
            onClick={resetSorting}
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
