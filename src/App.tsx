import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(
  goods: string[],
  sortByType: string,
  isReverse: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortByType) {
    return preparedGoods.sort((good1: string, good2: string) => {
      switch (sortByType) {
        case SORT_BY_ALPHABET:
          return isReverse
            ? good2.localeCompare(good1)
            : good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          if (good1.length === good2.length) {
            return isReverse
              ? good2.localeCompare(good1)
              : good1.localeCompare(good2);
          }

          return isReverse
            ? good2.length - good1.length
            : good1.length - good2.length;
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
  const [sortBy, setSortBy] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const goods = [...goodsFromServer];

  const preparedGoods = getPreparedGoods(goods, sortBy, isReverse);

  const handleIsReverse = () => setIsReverse(!isReverse);
  const handleReset = () => {
    setSortBy('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            button: true,
            'is-info': true,
            'is-light': sortBy !== SORT_BY_ALPHABET,
          })}
          onClick={() => setSortBy(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            button: true,
            'is-success': true,
            'is-light': sortBy !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortBy(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            button: true,
            'is-warning': true,
            'is-light': !isReverse,
          })}
          onClick={handleIsReverse}
        >
          Reverse
        </button>
        {(isReverse || !!sortBy) && (
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
        {preparedGoods.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
