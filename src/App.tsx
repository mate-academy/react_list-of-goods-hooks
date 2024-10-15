import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  ALPHABETICALLY = 'sort-alphabetically',
  BY_LENGTH = 'sort-by-length',
  NONE = '',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [reversed, setReversed] = useState(false);
  const [visibleGoods, setVisibleGoods] = useState<string[]>([
    ...goodsFromServer,
  ]);

  useEffect(() => {
    let sortedGoods = [...goodsFromServer];

    switch (sortField) {
      case SortType.ALPHABETICALLY:
        sortedGoods = sortedGoods.sort((good1, good2) =>
          good1.localeCompare(good2),
        );
        break;
      case SortType.BY_LENGTH:
        sortedGoods = sortedGoods.sort(
          (good1, good2) => good1.length - good2.length,
        );
        break;
      default:
        sortedGoods = [...goodsFromServer];
    }

    if (reversed) {
      sortedGoods.reverse();
    }

    setVisibleGoods(sortedGoods);
  }, [sortField, reversed]);

  const resetSort = () => {
    setSortField(SortType.NONE);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.ALPHABETICALLY,
            'is-active': sortField === SortType.ALPHABETICALLY,
          })}
          onClick={() => setSortField(SortType.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SortType.BY_LENGTH,
            'is-active': sortField === SortType.BY_LENGTH,
          })}
          onClick={() => setSortField(SortType.BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !reversed,
            'is-active': reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField !== SortType.NONE || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSort}
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
