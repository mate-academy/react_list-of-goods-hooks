import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { Good } from './components/Good/Good';

enum SortBy {
  default = 'default',
  name = 'name',
  length = 'length',
}

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

const getPreparedGoods = (
  goods: string[],
  sortedBy: SortBy,
  isReversed: boolean,
): string[] => {
  let preparedGoods = [...goods];

  if (sortedBy) {
    preparedGoods.sort((goodA, goodB) => {
      switch (sortedBy) {
        case SortBy.name:
          return goodA.localeCompare(goodB);

        case SortBy.length:
          return goodA.length - goodB.length;

        case SortBy.default:
          default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortBy, setSortBy] = useState(SortBy.default);
  const [isReversed, setIsReversed] = useState(false);

  const reset = () => {
    setSortBy(SortBy.default);
    setIsReversed(false);
  };

  const goods = getPreparedGoods(goodsFromServer, sortBy, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortBy.name,
          })}
          onClick={() => setSortBy(SortBy.name)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SortBy.length,
          })}
          onClick={() => setSortBy(SortBy.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy !== SortBy.default || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => <Good key={good} good={good} />)}
      </ul>
    </div>
  );
};
