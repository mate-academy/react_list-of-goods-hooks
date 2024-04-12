import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

enum SortedFields {
  null,
  alphabetically,
  length,
}

type PreparedGood = {
  sortField: SortedFields | null;
  isReversed: boolean;
};

function getPreparedGood(
  goods: string[],
  { sortField, isReversed }: PreparedGood,
): string[] {
  const preparedGoods = [...goods];

  if (SortedFields !== null) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortedFields.alphabetically:
          return good1.localeCompare(good2);

        case SortedFields.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });

    return isReversed ? preparedGoods.reverse() : preparedGoods;
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortedFields | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGood(goodsFromServer, {
    sortField,
    isReversed,
  });

  const handleOnClick = () => {
    setSortField(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortedFields.alphabetically,
          })}
          onClick={() => setSortField(SortedFields.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortedFields.length,
          })}
          onClick={() => setSortField(SortedFields.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={handleOnClick}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
