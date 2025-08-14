import cn from 'classnames';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { goodsFromServer } from './types';

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

type Props = {
  sortField: string;
  isReversed: boolean;
};
function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: Props,
): string[] {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SORT_FIELD_ALPHABET:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SORT_FIELD_LENGTH:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<string>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const isSorted = sortField !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
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
