import React from 'react';
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
  Default,
  Alphabetically = 'alphabetically',
  ByLength = 'length',
}

function getPreparedGoods(
  goods: string[],
  {
    sortField,
    reversed,
  }: {
    sortField: SortType;
    reversed: boolean;
  },
) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return good1.localeCompare(good2);

        case SortType.ByLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.Default);
  const [reversed, setReversed] = useState(false);
  const [initialGoods] = useState(goodsFromServer);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField: sortField,
    reversed,
  });

  const isDifferent = !initialGoods.every(
    (good, i) => good === visibleGoods[i],
  );

  const handleSortAlphabetically = () => setSortField(SortType.Alphabetically);

  const handleSortByLength = () => setSortField(SortType.ByLength);
  const handleReverse = () => setReversed(!reversed);
  const handleReset = () => {
    setSortField(SortType.Default);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleSortAlphabetically}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.Alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleSortByLength}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.ByLength,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {isDifferent && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
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
