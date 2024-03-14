import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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
  Length = 'LENGTH',
  Alphabet = 'ALPHABET',
}

interface FilterParams {
  sortField: SortType | '';
  isReversed: boolean;
}

function getPreperedGoods({ sortField, isReversed }: FilterParams): string[] {
  const preperedGoods = [...goodsFromServer];

  if (sortField) {
    preperedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App = () => {
  const [sortField, setsortField] = useState<SortType | ''>('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreperedGoods({ sortField, isReversed });
  const sortedOrReversedList = sortField || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setsortField(SortType.Alphabet)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setsortField(SortType.Length)}
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(!isReversed)}
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {sortedOrReversedList && (
          <button
            onClick={() => {
              setsortField('');
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
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
