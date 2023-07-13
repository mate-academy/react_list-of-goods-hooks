import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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

enum SortType {
  SORT_METOD_NAME = 'name',
  SORT_METOD_LENGTH = 'length',
  DEFAULT = '',
}

function getPreparedGoods(
  goods: string[],
  sortMetod: SortType,
  reverse: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortMetod) {
    preparedGoods.sort((good1, good2) => {
      switch (sortMetod) {
        case SortType.SORT_METOD_NAME:
          return good1.localeCompare(good2);

        case SortType.SORT_METOD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortMetod, setSortMetod] = useState(SortType.DEFAULT);
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortMetod, reversed);
  const handleRevers = () => {
    setReversed(!reversed);
  };

  const onReset = () => {
    setSortMetod(SortType.DEFAULT);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button', 'is-info',
              { 'is-light': sortMetod !== SortType.SORT_METOD_NAME })
          }
          onClick={() => setSortMetod(SortType.SORT_METOD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortMetod !== SortType.SORT_METOD_LENGTH })}
          onClick={() => setSortMetod(SortType.SORT_METOD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning',
            { 'is-light': !reversed })}
          onClick={handleRevers}
        >
          Reverse
        </button>

        {(sortMetod || reversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={onReset}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
