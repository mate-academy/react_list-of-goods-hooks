import React, { useState } from 'react';
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
  default = 'default',
  alphabet = 'alphabet',
  length = 'length',
}

interface ChangeStatus {
  sortField: SortType;
  reverseStatus: boolean;
}

const SORT_FIELD_BY_DEFAULT = SortType.default;
const SORT_FIELD_BY_ALPHABET = SortType.alphabet;
const SORT_FIELD_BY_LENGTH = SortType.length;

function getPrepearedGoods(
  goods: string[],
  { sortField, reverseStatus }: ChangeStatus,
): string[] {
  const prepearedGoods = [...goods];

  switch (sortField) {
    case SORT_FIELD_BY_ALPHABET:
      prepearedGoods.sort((good1, good2) => good1.localeCompare(good2));

      break;

    case SORT_FIELD_BY_LENGTH:
      prepearedGoods.sort((good1, good2) => (good1.length - good2.length));

      break;

    default:
      break;
  }

  if (reverseStatus) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SORT_FIELD_BY_DEFAULT);
  const [reverseStatus, setReverseStatus] = useState<boolean>(false);

  const visibleGoods
    = getPrepearedGoods(goodsFromServer, { sortField, reverseStatus });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SORT_FIELD_BY_ALPHABET },
          )}
          onClick={() => setSortField(SORT_FIELD_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SORT_FIELD_BY_LENGTH },
          )}
          onClick={() => setSortField(SORT_FIELD_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': reverseStatus === false },
          )}
          onClick={() => {
            if (reverseStatus === false) {
              setReverseStatus(true);
            } else {
              setReverseStatus(false);
            }
          }}
        >
          Reverse
        </button>

        {(sortField !== SORT_FIELD_BY_DEFAULT || reverseStatus === true) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SORT_FIELD_BY_DEFAULT);
              setReverseStatus(false);
            }}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => <li key={good} data-cy="Good">{good}</li>)}
      </ul>
    </div>
  );
};
