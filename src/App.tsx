import React, { useMemo, useState } from 'react';
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
  default = '',
  SORT_FIELD_ALPHABET = 'alphabet',
  SORT_FIELD_LENGTH = 'length',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.default);
  const [isReversed, setIsReversed] = useState(false);
  const isInitialState = sortField === SortType.default && !isReversed;

  function handleReset() {
    setSortField(SortType.default);
    setIsReversed(false);
  }

  function handleReverse() {
    setIsReversed(!isReversed);
  }

  function handleSort(field: SortType) {
    setSortField(field);
  }

  const visibleGoods = useMemo(() => {
    const goods = [...goodsFromServer];

    if (isReversed) {
      goods.reverse();
    }

    if (sortField !== SortType.default) {
      switch (sortField) {
        case SortType.SORT_FIELD_ALPHABET:
          goods.sort();
          break;
        case SortType.SORT_FIELD_LENGTH:
          goods.sort((a, b) => a.length - b.length);
          break;
      }
    }

    return goods;
  }, [sortField, isReversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SortType.SORT_FIELD_ALPHABET ? 'is-light' : ''}`}
          onClick={() => handleSort(SortType.SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SortType.SORT_FIELD_LENGTH ? 'is-light' : ''}`}
          onClick={() => handleSort(SortType.SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={() => handleReverse()}
        >
          Reverse
        </button>

        {isInitialState ? null : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleReset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
