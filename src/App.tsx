import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

export const App: React.FC = () => {
  enum SortType {
    SORT_FIELD_ALPHABET = 'alphabet',
    SORT_FIELD_LENGTH = 'length',
    SORT_FIELD_REVERSE = 'reverse'
  }

  function getPreparedGoods(goods: string[], sortField: SortType) {
    let preparedGoods = [...goods];

    if (sortField) {
      switch (sortField) {
        case SortType.SORT_FIELD_ALPHABET:
          preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
          break;

        case SortType.SORT_FIELD_LENGTH:
          preparedGoods.sort((good1, good2) => good1.length - good2.length);
          break;

        case SortType.SORT_FIELD_REVERSE:
          preparedGoods.reverse();
          break;
      }
    }

    return preparedGoods;
  }

  const [sortField, setSortField] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.SORT_FIELD_ALPHABET)}
          type="button"
          className={cn('button', 'is-info', { 'is-light': sortField !== SortType.SORT_FIELD_ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button', 'is-success', { 'is-light': sortField !== SortType.SORT_FIELD_LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setSortField(SortType.SORT_FIELD_REVERSE)}
          type="button"
          className={cn('button', 'is-warning', { 'is-light': sortField !== SortType.SORT_FIELD_REVERSE })}
        >
          Reverse
        </button>

        {sortField !== '' && (
          <button
            onClick={() => setSortField('')}
            type="button"
            className={cn('button', 'is-danger', { 'is-light': sortField === '' })}
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
