import React, { useState } from 'react';
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

enum SortField {
  ALPHABETICALLY = 'alphabetically',
  LENGTH = 'length',
}

function getPreparedFoods(
  goods: string[],
  sortField: SortField | null,
  isReversed: boolean,
) {
  const initialGoods = [...goods];

  switch (sortField) {
    case SortField.ALPHABETICALLY:
      initialGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortField.LENGTH:
      initialGoods.sort((a, b) => a.length - b.length);
      break;
  }

  if (isReversed) {
    initialGoods.reverse();
  }

  return initialGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods: string[] = getPreparedFoods(
    goodsFromServer,
    sortField,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info${sortField === SortField.ALPHABETICALLY ? '' : ' is-light'}`}
          onClick={() => setSortField(SortField.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success${sortField === SortField.LENGTH ? '' : ' is-light'}`}
          onClick={() => setSortField(SortField.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning${isReversed ? '' : ' is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField !== null || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(null);
              setIsReversed(false);
            }}
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
