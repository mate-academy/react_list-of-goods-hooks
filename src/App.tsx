import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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

export enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
  Default = '',
}

function getPreparedGoods(sortField: SortType): string[] {
  const preparedGoods = [...goodsFromServer];

  switch (sortField) {
    case SortType.Alphabet:
      return preparedGoods.sort(
        (good1, good2) => good1.localeCompare(good2),
      );

    case SortType.Length:
      return preparedGoods.sort(
        (good1, good2) => good1.length - good2.length,
      );

    default:
      return preparedGoods;
  }
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.Default);
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods: string[] = getPreparedGoods(sortField);

  if (reverseField) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabet)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.Length)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseField(!reverseField)}
          type="button"
          className={cn('button is-warning ', {
            'is-light': !reverseField,
          })}
        >
          Reverse
        </button>

        {(
          (sortField || reverseField) && (
            <button
              onClick={() => {
                setSortField(SortType.Default);
                setReverseField(false);
              }}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
