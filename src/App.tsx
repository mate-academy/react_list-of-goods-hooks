/* eslint-disable default-case */
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

enum SortField {
  None = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortField,
  reverseField: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.Alphabet:
          return good1.localeCompare(good2);

        case SortField.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortField>(SortField.None);
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    reverseField,
  );

  function reset() {
    setSortField(SortField.None);
    setReverseField(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortField.Alphabet,
          })}
          onClick={() => setSortField(SortField.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortField.Length,
          })}
          onClick={() => setSortField(SortField.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverseField,
          })}
          onClick={() => setReverseField(!reverseField)}
        >
          Reverse
        </button>

        {!sortField && !reverseField ? null : (
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
        {visibleGoods.map(good => (
          // eslint-disable-next-line react/jsx-key
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
