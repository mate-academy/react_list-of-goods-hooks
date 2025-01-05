import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';
import { goodsFromServer } from './api/goods';

enum SortType {
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  EMPTY = '',
}

const getPreparedGoods = (goods: string[], sortBy: SortType) => {
  const preparedGoods = [...goods];

  const sortTypeValidation = Object.values(SortType).includes(sortBy);

  if (sortBy && sortTypeValidation) {
    switch (sortBy) {
      case SortType.ALPHABET:
        return preparedGoods.sort((a, b) => a.localeCompare(b));

      case SortType.LENGTH:
        return preparedGoods.sort((a, b) => a.length - b.length);

      default:
        return preparedGoods;
    }
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.EMPTY);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer as string[], sortBy);

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortType.ALPHABET,
          })}
          onClick={() => setSortBy(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SortType.LENGTH,
          })}
          onClick={() => setSortBy(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortBy(SortType.EMPTY);
            }}
          >
            Reset
          </button>
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
