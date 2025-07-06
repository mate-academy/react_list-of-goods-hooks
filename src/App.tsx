import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

enum SortBy {
  ALPHABETICALLY = 'Sort alphabetically',
  LENGTH = 'Sort by length',
}

export const App = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sortBy, setSortBy] = useState<SortBy | ''>('');
  const [isReversed, setIsReversed] = useState(false);

  const sortByAlphabetically = () => {
    let sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    if (isReversed) {
      sorted = sorted.reverse();
    }

    setGoods(sorted);
    setSortBy(SortBy.ALPHABETICALLY);
  };

  const sortByLength = () => {
    let sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

    if (isReversed) {
      sorted = sorted.reverse();
    }

    setGoods(sorted);
    setSortBy(SortBy.LENGTH);
  };

  const reverseBtn = () => {
    setGoods(prev => [...prev].reverse());
    setIsReversed(prev => !prev);
  };

  const resetBtn = () => {
    setGoods(goodsFromServer);
    setSortBy('');
    setIsReversed(false);
  };

  const isOriginalOrder = sortBy === '' && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortBy !== SortBy.ALPHABETICALLY,
          })}
          onClick={sortByAlphabetically}
        >
          {SortBy.ALPHABETICALLY}
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortBy !== SortBy.LENGTH,
          })}
          onClick={sortByLength}
        >
          {SortBy.LENGTH}
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={reverseBtn}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
            onClick={resetBtn}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
