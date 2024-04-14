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

const SORT_ALPHABETIACALLY = 'sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

function visibleListGoods(
  goods: string[],
  sortField: string,
  reverseGood: boolean,
) {
  let sortGoods: string[] = [...goods];

  if (sortField) {
    sortGoods = sortGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_ALPHABETIACALLY:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseGood) {
    sortGoods.reverse();
  }

  return sortGoods;
}

function resetSorting(
  setSortField: React.Dispatch<React.SetStateAction<string>>,
  setReverseGood: React.Dispatch<React.SetStateAction<boolean>>,
) {
  setSortField('');
  setReverseGood(false);
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reverseGood, setReverseGood] = useState(false);

  const visibleGoods = visibleListGoods(
    goodsFromServer,
    sortField,
    reverseGood,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_ALPHABETIACALLY,
          })}
          onClick={() => setSortField(SORT_ALPHABETIACALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverseGood,
          })}
          onClick={() => setReverseGood(!reverseGood)}
        >
          Reverse
        </button>

        {(sortField || reverseGood) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => resetSorting(setSortField, setReverseGood)}
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
