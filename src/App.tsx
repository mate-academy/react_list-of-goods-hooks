import React, { useState } from 'react';
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

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortFiled: SortType,
  isReversed: boolean,
};

function getPreparedGoods(
  goods: string[],
  { sortFiled, isReversed }: ReorderOptions,
) {
  const preparedGoods = [...goods];

  if (sortFiled) {
    preparedGoods.sort((good1, good2) => {
      switch (sortFiled) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortFiled, setSortFiled] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortFiled, isReversed },
  );

  const handleReverseClick = () => {
    setReverse(prev => !prev);
  };

  function reset() {
    setSortFiled(SortType.NONE);
    setReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortFiled(SortType.ALPHABET)}
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortFiled !== SortType.ALPHABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortFiled(SortType.LENGTH)}
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortFiled !== SortType.LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverseClick}
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
        >
          Reverse
        </button>

        {(sortFiled || isReversed)
        && (
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
