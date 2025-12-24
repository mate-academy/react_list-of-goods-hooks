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
] as const;

type SortType = 'none' | 'alphabet' | 'length';

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>('none');
  const [reversed, setReversed] = useState<boolean>(false);

  const isChanged = sortType !== 'none' || reversed;

  const handleSort = (newSortType: SortType) => {
    if (sortType === newSortType) {
      setReversed(prev => !prev);
    } else {
      setSortType(newSortType);
    }
  };

  const handleReset = () => {
    setSortType('none');
    setReversed(false);
  };

  const visibleGoods = [...goodsFromServer];

  if (sortType === 'alphabet') {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === 'length') {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={() => handleSort('alphabet')}
          data-cy="SortAlphabetically"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={() => handleSort('length')}
          data-cy="SortByLength"
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(prev => !prev)}
          data-cy="Reverse"
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
            data-cy="Reset"
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
