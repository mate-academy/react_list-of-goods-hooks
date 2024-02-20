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

enum SortType {
  SORT_ALPHABETICALLY = 'name',
  SORT_BY_LENGTH = 'length',
  none = '',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  if (isReversed) {
    if (
      // eslint-disable-next-line operator-linebreak
      sortField === SortType.SORT_ALPHABETICALLY ||
      sortField === SortType.SORT_BY_LENGTH
    ) {
      preparedGoods.reverse();
    } else {
      preparedGoods.reverse();
    }
  }

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_ALPHABETICALLY:
          return isReversed
            ? good2.localeCompare(good1)
            : good1.localeCompare(good2);

        case SortType.SORT_BY_LENGTH:
          return isReversed
            ? good2.length - good1.length
            : good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SortType.none);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  const resetSort = () => {
    setSortField(SortType.none);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.SORT_ALPHABETICALLY,
          })}
          onClick={() => setSortField(SortType.SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {sortField || isReversed ? (
          <button
            type="button"
            className={classNames('button is-danger', {
              'is-light': sortField,
            })}
            onClick={resetSort}
          >
            Reset
          </button>
        ) : (
          ''
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
