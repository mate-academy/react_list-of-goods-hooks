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
  Alpha = 'Alphabetically',
  Length = 'Length',
  Default = '',
}

type Props = {
  visibleGoods: string[],
};

function getPreparedGoods(
  goods: string[],
  { sortField, reverseField }: {
    sortField: SortType,
    reverseField: boolean
  },
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alpha:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const GoodsList: React.FC<Props> = ({ visibleGoods }) => (
  <ul>
    {visibleGoods.map(good => (
      <li key={good} data-cy="Good">{good}</li>
    ))}
  </ul>
);

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [reverseField, setIsReversedField] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, reverseField });

  const resetAll = () => {
    setSortField(SortType.Default);
    setIsReversedField(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alpha)}
          type="button"
          className={cn('button', 'is-info',
            {
              'is-light': sortField !== SortType.Alpha,
            })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.Length)}
          type="button"
          className={cn('button', 'is-success',
            {
              'is-light': sortField !== SortType.Length,
            })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversedField(!reverseField)}
          type="button"
          className={cn('button', 'is-warning',
            {
              'is-light': !reverseField,
            })}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            onClick={resetAll}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList visibleGoods={visibleGoods} />

    </div>
  );
};
