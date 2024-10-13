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

enum SortField {
  alphabet = 'alphabet',
  length = 'length',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortField | null,
  reversed: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.alphabet:
          return good1.localeCompare(good2);
        case SortField.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, reversed);
  const isActive = (field: SortField) => field !== sortField;

  function handleReset() {
    setSortField(null);
    setReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': isActive(SortField.alphabet),
          })}
          onClick={() => setSortField(SortField.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': isActive(SortField.length),
          })}
          onClick={() => setSortField(SortField.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !reversed })}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {(reversed || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
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
