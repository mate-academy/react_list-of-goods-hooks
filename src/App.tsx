import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';

import './App.scss';
import { SortType } from './types/SortType';
import { FilterParams } from './types/FilterParams';

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

function getPrepearedGoods(
  goods: string[],
  { sortfield, isReversed }: FilterParams,
) {
  let prepearedGoods = [...goods];

  if (sortfield) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortfield) {
        case SortType.SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SortType.SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepearedGoods = prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortfield, setSortfield] = useState(SortType.SORT_FIELD_DEFAULT);
  const [isReversed, setIsReversed] = useState(false);
  const visiblegoods = getPrepearedGoods(goodsFromServer, {
    sortfield,
    isReversed,
  });
  const setReverseClick = () =>
    setIsReversed(prevIsReversed => !prevIsReversed);
  const handleReset = () => {
    setSortfield(SortType.SORT_FIELD_DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortfield !== SortType.SORT_FIELD_ALPHABET,
          })}
          onClick={() => {
            setSortfield(SortType.SORT_FIELD_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortfield !== SortType.SORT_FIELD_LENGTH,
          })}
          onClick={() => {
            setSortfield(SortType.SORT_FIELD_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={setReverseClick}
        >
          Reverse
        </button>

        {(sortfield || isReversed) && (
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
        {visiblegoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
