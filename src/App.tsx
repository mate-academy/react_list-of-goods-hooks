import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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
  SORT_FIELD_ALPHABET = 'alphabet',
  SORT_FIELD_LENGTH = 'length',
  SORT_FIELD_REVERSE = 'reverse',
  SORT_FIELD_DEFAULT = '',
}

function getPreparedGoods(
  goods: string[],
  sortField: string,
  isReverse: boolean,
) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SortType.SORT_FIELD_ALPHABET:
        return good1.localeCompare(good2);

      case SortType.SORT_FIELD_LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (sortField === SortType.SORT_FIELD_REVERSE) {
    return preparedGoods.reverse();
  }

  if (isReverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SortType.SORT_FIELD_DEFAULT);
  const [isReverse, setIsReverse] = useState(false);

  const sortGoods = getPreparedGoods(goodsFromServer, sortField, isReverse);

  const toggleReverse = () => {
    setIsReverse(prevIsReverse => !prevIsReverse);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.SORT_FIELD_ALPHABET)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.SORT_FIELD_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={toggleReverse}
          type="button"
          className={cn('button is-warning', { 'is-light': !isReverse })}
        >
          Reverse
        </button>

        {sortField || isReverse ? (
          <button
            onClick={() => {
              setSortField(SortType.SORT_FIELD_DEFAULT);
              setIsReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>
      <ul style={{ marginRight: '10px' }}>
        {sortGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
