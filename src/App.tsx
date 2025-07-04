import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_RESET = '';

function getPreparedGoods(
  goods: string[],
  options: { sortField: string; isReversed: boolean },
) {
  let preparedGoods = [...goods];

  if (options.sortField === SORT_FIELD_LENGTH) {
    preparedGoods = preparedGoods.sort(
      (good1, good2) => good1.length - good2.length,
    );
  }

  if (options.sortField === SORT_FIELD_ALPHABETICALLY) {
    preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (options.sortField === SORT_FIELD_RESET) {
    preparedGoods = [...goods];
  }

  if (options.isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  }); // ?

  const handleReverseClick = () => {
    setIsReversed(prevIsReversed => !prevIsReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed === false,
          })}
          onClick={() => {
            handleReverseClick();
          }}
        >
          Reverse
        </button>

        {sortField || isReversed !== false ? (
          <button
            type="button"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
            className={cn('button is-danger', {
              'is-light': sortField !== SORT_FIELD_RESET,
            })}
          >
            Reset
          </button>
        ) : (
          SORT_FIELD_RESET
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
