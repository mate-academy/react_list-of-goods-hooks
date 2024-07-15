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

enum SortType {
  SORT_FIELD_ALPHABET = 'alphabet',
  SORT_FIELD_LENGTH = 'length',
  SORT_FIELD_RESET = '',
}

function getSortedArray(
  array: string[],
  sortField: string,
  isReversed: boolean,
): string[] {
  const preparedGoods = [...array];

  if (sortField) {
    switch (sortField) {
      case SortType.SORT_FIELD_ALPHABET:
        preparedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.SORT_FIELD_LENGTH:
        preparedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<string>('');
  const [isReversed, setReverseField] = useState<boolean>(false);
  const visibleGoods = getSortedArray(goodsFromServer, sortField, isReversed);

  function onSortHandler(sortType: string, shouldReverse?: boolean) {
    setSortField(sortType);

    if (shouldReverse) {
      onReverseHandler(shouldReverse);
    }
  }

  function onReverseHandler(isReversed: boolean) {
    setReverseField(!isReversed);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button', 'is-info', {
              'is-light' : sortField !== SortType.SORT_FIELD_ALPHABET
            })
          }
          onClick={() => onSortHandler(SortType.SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button', 'is-success', {
              'is-light' : sortField !== SortType.SORT_FIELD_LENGTH
            })
          }
          onClick={() => onSortHandler(SortType.SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {'is-light': !isReversed })}
          onClick={() => onReverseHandler(isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => onSortHandler(SortType.SORT_FIELD_RESET, true)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
