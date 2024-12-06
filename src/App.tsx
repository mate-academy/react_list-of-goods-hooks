import { useState } from 'react';
import cn from 'classnames';
import { GoodList } from './components/GoodList';
import 'bulma/css/bulma.css';
import './App.scss';
import React from 'react';
import { Props } from './components/types/Props';

//const SORT_FIELD_ALPHABETICALLY = 'Sort alphabetically';
///const SORT_FIELD_LENGTH = 'Sort by length';

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

enum SortBy {
  SORT_FIELD_ALPHABETICALLY = 'Sort alphabetically',
  SORT_FIELD_LENGTH = 'Sort by length',
  INITIAL_SORT_FIELD = '',
}

function getPreparedGoods(goods: string[], { sortField, reversed }: Props) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortBy.SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        case SortBy.SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC<Props> = () => {
  const [sortField, setSortField] = useState(SortBy.INITIAL_SORT_FIELD);
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  return (
    <div className="App">
      <h1>
        {' '}
        {sortField}
        {`${reversed ? ' reversed' : ''}`}
      </h1>
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            onClick={() => setSortField(SortBy.SORT_FIELD_ALPHABETICALLY)}
            className={cn`button is-info ${sortField === SortBy.SORT_FIELD_ALPHABETICALLY ? 'is-active' : 'is-light'}`}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            onClick={() => setSortField(SortBy.SORT_FIELD_LENGTH)}
            className={cn`button is-success ${
              sortField === SortBy.SORT_FIELD_LENGTH ? 'is-active' : 'is-light'
            }`}
          >
            Sort by length
          </button>

          <button
            type="button"
            onClick={() => setReversed(!reversed)}
            className={cn`button is-warning ${
              reversed ? 'is-active' : 'is-light'
            }`}
          >
            Reverse
          </button>

          {sortField || reversed ? (
            <button
              type="button"
              className={cn`button is-danger ${
                sortField || reversed !== false ? 'is-active' : 'is-light'
              }`}
              onClick={() => {
                setReversed(false);
                setSortField(SortBy.INITIAL_SORT_FIELD);
              }}
            >
              Reset
            </button>
          ) : (
            ''
          )}
        </div>
        <hr />

        <GoodList goods={visibleGoods} />
      </div>
    </div>
  );
};
