import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';

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

const SORT_FIELD_ALPH = 'alphabetical';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(
  goods: string[],
  { sortType, isReverse }: { sortType: string; isReverse: boolean },
) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_FIELD_ALPH:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const handleReset = () => {
    setSortField('');
    setIsReverse(false);
  };

  const handleSortByAlphabet = () => {
    setSortField(SORT_FIELD_ALPH);
  };

  const handleSortByLength = () => {
    setSortField(SORT_FIELD_LENGTH);
  };

  const handleReverse = () => {
    setIsReverse(prevState => !prevState);
  };

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortType: sortField,
    isReverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSortByAlphabet}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPH,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSortByLength}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
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
