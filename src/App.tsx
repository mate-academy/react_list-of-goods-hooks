import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

interface Props {
  sortField: TypeSort;
  isReverse: boolean;
}

enum TypeSort {
  Alphabet = 'alphabet',
  Length = 'length',
  None = '',
}

// const SORT_FIELD_ALPHABET = 'alphabet';
// const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(
  goods: string[],
  { sortField, isReverse }: Props,
): string[] {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case TypeSort.Length:
      // case SORT_FIELD_LENGTH:
        return good1.length - good2.length;
      case TypeSort.Alphabet:
      // case SORT_FIELD_ALPHABET:
        return good1.localeCompare(good2);

      default:
        return 0;
    }
  });

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<TypeSort>(TypeSort.None);
  // const [sortField, setSortField] = useState<string>('');
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== TypeSort.Alphabet,
            // 'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
          onClick={() => setSortField(TypeSort.Alphabet)}
          // onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== TypeSort.Length,
            // 'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(TypeSort.Length)}
          // onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReverse })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(isReverse || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(TypeSort.None);
              setIsReverse(false);
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
