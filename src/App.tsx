import 'bulma/css/bulma.css';
import './App.scss';
import React from 'react';
import cn from 'classnames';
import { useState } from 'react';

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
  SortAlphabetically = 'Sort alphabetically',
  SortByLength = 'Sort by length',
  Reverse = 'Reverse',
  Reset = 'Reset',
}

const SORT_FIELD_BY_NAME = 'name';
const SORT_FIELD_BY_LENGTH = 'length';

function getSortedGoods(
  goods: string[],
  sortField: string,
  isReversed: boolean,
) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_BY_LENGTH:
          return good1.length - good2.length;
        case SORT_FIELD_BY_NAME:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getSortedGoods(goodsFromServer, sortField, isReversed);

  const resetStates = () => {
    setSortField('');
    setIsReversed(false);
  };

  const reverseState = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_BY_NAME)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_BY_NAME,
          })}
        >
          {SortType.SortAlphabetically}
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_BY_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_BY_LENGTH,
          })}
        >
          {SortType.SortByLength}
        </button>

        <button
          onClick={reverseState}
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed !== true,
          })}
        >
          {SortType.Reverse}
        </button>

        {(sortField || isReversed) && (
          <button
            onClick={resetStates}
            type="button"
            className="button is-danger is-light"
          >
            {SortType.Reset}
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
