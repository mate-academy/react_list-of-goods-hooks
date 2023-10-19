import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { Good } from './components/Good/Good';

enum SortBy {
  DEFAULT = 'default',
  NAME = 'name',
  LENGTH = 'length',
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
      if (sortedBy === SortBy.NAME) {
        return goodA.localeCompare(goodB);
      }

      if (sortedBy === SortBy.LENGTH) {
        return goodA.length - goodB.length;
      }

      return 0;
    });
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortBy.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);
  const goods = getPreparedGoods(goodsFromServer, sortBy, isReversed);

  const reset = () => {
    setSortBy(SortBy.DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortBy.NAME,
          })}
          onClick={() => setSortBy(SortBy.NAME)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SortBy.LENGTH,
          })}
          onClick={() => setSortBy(SortBy.LENGTH)}
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

        {(sortBy !== SortBy.DEFAULT || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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
