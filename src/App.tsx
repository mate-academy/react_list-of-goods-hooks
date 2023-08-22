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

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

const getReorderedGoods = (
  goods: string[],
  oldSortType: SortType,
  oldIsReversed: boolean,
) => {
  const visibleGoods = [...goods];

  visibleGoods.sort((a, b) => {
    switch (oldSortType) {
      case SortType.ALPHABET:
        return a.localeCompare(b);
      case SortType.LENGTH:
        return a.length - b.length;
      default:
        return SortType.NONE;
    }
  });

  if (oldIsReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
};

export const App: React.FC = () => {
  const [isReversed, setReserved] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE as SortType);

  const sortBy = (Type: SortType) => {
    setSortType(Type);
  };

  const reverse = () => {
    setReserved(oldIsReversed => !oldIsReversed);
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setReserved(false);
  };

  const visibleGoods = getReorderedGoods(
    goodsFromServer, sortType, isReversed,
  );

  const showResetButton = isReversed || sortType !== SortType.NONE;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortType === SortType.ALPHABET
            ? 'button is-info'
            : 'button is-info is-light'}
          onClick={() => sortBy(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortType === SortType.LENGTH
            ? 'button is-success'
            : 'button is-success is-light'}
          onClick={() => sortBy(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={isReversed === true
            ? 'button is-warning'
            : 'button is-warning is-light'}
          onClick={reverse}
        >
          Reverse
        </button>

        {showResetButton && (
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
        <ul>
          {visibleGoods.map(item => (
            <li data-cy="Good" key={item}>{item}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
