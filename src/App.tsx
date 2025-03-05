import { useState } from 'react';
import 'bulma/css/bulma.css';
import classNames from 'classnames';
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
  none = 'none',
  alphabetically = 'alphabetically',
  byLength = 'byLength',
}

function sortGoods(sortBy: SortType, reverse: boolean) {
  const sorted = [...goodsFromServer].sort((a, b) => {
    switch (sortBy) {
      case SortType.alphabetically:
        return a.localeCompare(b);
      case SortType.byLength:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  return reverse ? sorted.reverse() : sorted;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.none);
  const [reverse, setReverse] = useState<boolean>(false);
  const goods = sortGoods(sortBy, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortBy !== SortType.alphabetically,
          })}
          onClick={() => setSortBy(SortType.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortBy !== SortType.byLength,
          })}
          onClick={() => setSortBy(SortType.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>
        {(sortBy !== SortType.none || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.none); // Set to 'none' for reset
              setReverse(false);
            }}
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
