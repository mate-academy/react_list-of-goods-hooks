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

type SortField = 'abc' | '123' | '';

const SORT_FIELD_ALPHABETICALLY = 'abc';
const SORT_FIELD_LENGTH = '123';

const getPreparedGoods = (
  goods: string[],
  sortField: SortField,
  isReversed: boolean,
): string[] => {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SORT_FIELD_ALPHABETICALLY:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SORT_FIELD_LENGTH:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField | ''>('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const hasChanges = sortField !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
          onClick={() =>
            setSortField(
              sortField === SORT_FIELD_ALPHABETICALLY
                ? ''
                : SORT_FIELD_ALPHABETICALLY,
            )
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() =>
            setSortField(
              sortField === SORT_FIELD_LENGTH ? '' : SORT_FIELD_LENGTH,
            )
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {hasChanges && (
          <button
            type="button"
            className="button is-danger"
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
