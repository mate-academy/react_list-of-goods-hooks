import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
}

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

function getPreparedGoods(
  goods : string[],
  sortField: SortType | undefined,
  IsReverse = false,
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
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

  if (IsReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | undefined>(undefined);
  const [isReverse, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReverse);

  function reset() {
    setSortField(undefined);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.Alphabet)}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.Length)}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(prev => !prev)}
          className={cn('button', 'is-warning', {
            'is-light': !isReverse,
          })}
        >
          Reverse
        </button>

        {
          (sortField || isReverse) && (
            <button
              onClick={reset}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {
          visibleGoods.map(good => <li data-cy="Good" key={good}>{good}</li>)
        }
      </ul>
    </div>
  );
};
