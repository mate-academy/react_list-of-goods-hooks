import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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

function getReorderedGoods(
  goods: string[],
  reversed: boolean,
  sort: SortType,
): string[] {
  const visibleGoods = [...goods];

  visibleGoods.sort((a, b) => {
    switch (sort) {
      case SortType.ALPHABET:
        return a.localeCompare(b);

      case SortType.LENGTH:
        return a.length - b.length;

      case SortType.NONE:
        return 0;

      default:
        throw new Error('Error');
    }
  });

  if (reversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const toReverse = () => {
    setReversed(!isReversed);
  };

  const sortByAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const toReset = () => {
    setSortType(SortType.NONE);
    setReversed(false);
  };

  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    isReversed,
    sortType,
  );

  const isVisible = (sortType !== SortType.NONE || isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': SortType.ALPHABET !== sortType },
          )}
          onClick={sortByAlphabet}

        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': SortType.LENGTH !== sortType },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={toReverse}
        >
          Reverse
        </button>

        {isVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={toReset}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        <ul>
          {reorderedGoods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
