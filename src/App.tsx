import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

const SORT_FIELD_ALPHABETICALLY = 'alphabetically' as const;
const SORT_FIELD_LENGTH = 'length' as const;

type SortField =
  | typeof SORT_FIELD_ALPHABETICALLY
  | typeof SORT_FIELD_LENGTH
  | '';

export const goodsFromServer: string[] = [
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

function getPreparedGoods(
  goods: string[],
  sortField: SortField,
  isReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SORT_FIELD_ALPHABETICALLY:
        return good1.localeCompare(good2);
      case SORT_FIELD_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);
  const isModified = sortField !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
          type="button"
          className={`button is-info ${
            sortField === SORT_FIELD_ALPHABETICALLY ? '' : 'is-light'
          }`}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={`button is-success ${
            sortField === SORT_FIELD_LENGTH ? '' : 'is-light'
          }`}
        >
          Sort by length
        </button>
        <button
          onClick={() => setIsReversed(prev => !prev)}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>
        {isModified && (
          <button
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger"
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
