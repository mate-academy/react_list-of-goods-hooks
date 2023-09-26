import 'bulma/css/bulma.css';
import { useState } from 'react';
import cn from 'classnames';
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
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  NONE = '',
}

type SortOptions = {
  sortField: SortType,
  reverseField: boolean,
};

function getSortedGoods(
  goods: string[],
  { sortField, reverseField }: SortOptions,
) {
  const sortedGoods = [...goods];

  if (sortField) {
    sortedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);
        case SortType.LENGTH:
          return good1[SortType.LENGTH]
            - good2[SortType.LENGTH];
        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SortType.NONE);
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = getSortedGoods(
    goodsFromServer,
    { sortField, reverseField },
  );

  function makeReset() {
    setSortField(SortType.NONE);
    setReverseField(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.ALPHABET,
          })}
          onClick={() => setSortField(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverseField === false,
          })}
          onClick={() => setReverseField(!reverseField)}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={makeReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
