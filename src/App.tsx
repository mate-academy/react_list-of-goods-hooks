/* eslint-disable max-len */
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

const IS_SORTED_ALPHABETICALLY = 'alphabetically';
const IS_SORTED_BY_LENGTH = 'length';

function getPreparedGoods(
  goods: string[],
  { sortType, isReversed }: { sortType: string; isReversed: boolean },
) {
  let preparedGoods = [...goods];

  switch (sortType) {
    case IS_SORTED_ALPHABETICALLY:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case IS_SORTED_BY_LENGTH:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  const toggleReverse = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== IS_SORTED_ALPHABETICALLY,
          })}
          onClick={() => setSortType(IS_SORTED_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== IS_SORTED_BY_LENGTH,
          })}
          onClick={() => setSortType(IS_SORTED_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {sortType || isReversed ? (
          <button type="button" className="button is-danger" onClick={reset}>
            Reset
          </button>
        ) : null}
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
