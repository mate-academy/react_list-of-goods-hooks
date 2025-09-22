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
  'default',
  'name',
  'length',
}

function getPreparedGoods(goods: string[], sortField: SortType) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortField) {
      case SortType.name:
        return good1.localeCompare(good2);
      case SortType.length:
        return good1.length - good2.length;
      case SortType.default:
        return 0;
    }
  });

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.default);
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField);
  const shownGoods = reverse ? [...visibleGoods].reverse() : visibleGoods;

  const handleSortByName = () => setSortField(SortType.name);
  const handleSortByLength = () => setSortField(SortType.length);
  const handleToggleReverse = () => {
    setReverse(!reverse);
  };
  const handleReset = () => {
    setSortField(SortType.default);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.name,
          })}
          onClick={handleSortByName}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': reverse === false })}
          onClick={handleToggleReverse}
        >
          Reverse
        </button>

        {(reverse || sortField !== SortType.default) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {shownGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
