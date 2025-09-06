import * as React from 'react';
import { useState } from 'react';
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
  SORT_ABC = 'sortABC',
  SORT_LENGTH = 'sortLength',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [reversed, setReversed] = useState<boolean>(false);
  let visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case SortType.SORT_ABC:
        return good1.localeCompare(good2);
      case SortType.SORT_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  const handleReset = () => {
    setSortField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.SORT_ABC ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.SORT_ABC)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortField === SortType.SORT_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.SORT_LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => {
            setReversed(prev => !prev);
          }}
        >
          Reverse
        </button>
        {visibleGoods.some((item, i) => item !== goodsFromServer[i]) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
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
