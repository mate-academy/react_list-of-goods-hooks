import 'bulma/css/bulma.css';
import './App.scss';
import React from 'react';
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

enum SortType {
  'none',
  'alph',
  'len',
}

function getPreparedList(array: string[], sortBy: SortType, reverse: boolean) {
  const preparedList = [...array];

  preparedList.sort((good1, good2) => {
    switch (sortBy) {
      case SortType.alph:
        return good1.localeCompare(good2);
      case SortType.len:
        return good1.length - good2.length;
      case SortType.none:
      default:
        return 0;
    }
  });

  if (reverse) {
    preparedList.reverse();
  }

  return preparedList;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = React.useState<SortType>(SortType.none);
  const [isReversed, setIsReversed] = React.useState(false);

  const preparedList = getPreparedList(goodsFromServer, sortBy, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortType.alph,
          })}
          onClick={() => setSortBy(SortType.alph)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SortType.len,
          })}
          onClick={() => setSortBy(SortType.len)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {!!(isReversed || sortBy) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.none);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedList.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
