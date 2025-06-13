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

enum SortType {
  none = '',
  name = 'name',
  length = 'length',
}

function check<T>(originalArray: T[], currentArray: T[]) {
  for (let i = 0; i < originalArray.length; i += 1) {
    if (originalArray[i] !== currentArray[i]) {
      return false;
    }
  }

  return true;
}

function getPrepareGoods<T extends string>(goods: T[], sortBy: SortType) {
  const preparedGoods = [...goods];

  if (sortBy !== SortType.none) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.name:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortId, setSortId] = useState<SortType>(SortType.none);
  const [reversed, setReversed] = useState(false);

  let visibleGoods = getPrepareGoods(goodsFromServer, sortId);

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  const checkResult = check(goodsFromServer, visibleGoods);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortId === SortType.name ? '' : 'is-light'}`}
          onClick={() => setSortId(SortType.name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortId === SortType.length ? '' : 'is-light'}`}
          onClick={() => setSortId(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {!checkResult ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortId(SortType.none);
              setReversed(false);
            }}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
