import { useState } from 'react';
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

enum SortType {
  NONE = '',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

function getPreparedGoods(
  goods: string[],
  sortType: SortType,
  isReverse = false,
) {
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods
      .sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortType === SortType.LENGTH) {
    visibleGoods.sort(
      (goods1, goods2) => goods1.length - goods2.length,
    );
  }

  if (isReverse) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortType, isReverse);

  const resetButton = () => {
    setSortType(SortType.NONE);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            setSortType(SortType.ALPHABET);
          }}
          className={cn('button', 'is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => {
            setSortType(SortType.LENGTH);
          }}
          className={cn('button', 'is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
            setIsReverse(prev => !prev);
          }}
          className={cn('button', 'is-warning',
            {
              'is-light': !isReverse,
            })}
        >
          Reverse
        </button>

        {(sortType || isReverse) && (
          <button
            type="button"
            onClick={resetButton}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))}

        </ul>
      </ul>
    </div>
  );
};
