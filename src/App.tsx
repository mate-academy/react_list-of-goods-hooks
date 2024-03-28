import React, { useState } from 'react';
import classnames from 'classnames';
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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ALPHABET = 'alphabet';

type SortField = 'length' | 'alphabet' | '';

function getSortedGoods(
  goods: string[],
  sortField: SortField,
  reverseSort: boolean,
) {
  const prepearGoods = [...goods];

  if (sortField) {
    prepearGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (reverseSort) {
    prepearGoods.reverse();
  }

  return prepearGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>('');
  const [reverseSort, setReverseSort] = useState(false);

  const reverseChange = () => {
    setReverseSort(!reverseSort);
  };

  const sortedGoods = getSortedGoods(goodsFromServer, sortField, reverseSort);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          type="button"
          className={`button is-info ${sortField !== SORT_FIELD_ALPHABET && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={`button is-success ${sortField !== SORT_FIELD_LENGTH && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={reverseChange}
          type="button"
          className={classnames('button', 'is-warning', {
            'is-light': !reverseSort,
          })}
        >
          Reverse
        </button>

        {(sortField || reverseSort) && (
          <button
            onClick={() => {
              setSortField('');
              setReverseSort(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
