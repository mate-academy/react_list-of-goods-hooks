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
  name = 'name',
  length = 'length',
  empty = ' ',
}

function getSortedGoods(
  goods: string[],
  sortBy: SortType,
  reverse: boolean,
) : string[] {
  const preparedGoods = [...goods];

  switch (sortBy) {
    case SortType.name:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SortType.length:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  return reverse ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState(SortType.empty);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getSortedGoods(
    goodsFromServer, sortBy, isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortType.name,
          })}
          onClick={() => {
            setSortBy(SortType.name);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SortType.length,
          })}
          onClick={() => {
            setSortBy(SortType.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortBy !== SortType.empty || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortBy(SortType.empty);
                setIsReversed(false);
              }}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
