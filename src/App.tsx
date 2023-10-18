import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

enum Buttons {
  SORT__ALPHBETICALLY = 'sort__alphabetically',
  SORT__BY__LENGTH = 'sort__by__length',
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
  goods: string[],
  sortType: Buttons | null,
  isReversed: boolean,
) {
  const copyGoods = [...goods];

  if (sortType) {
    copyGoods.sort((good1, good2) => {
      switch (sortType) {
        case 'sort__alphabetically':
          return good1.localeCompare(good2);
        case 'sort__by__length':
          return good1.length - good2.length;

        default: return 0;
      }
    });
  }

  return isReversed ? copyGoods.reverse() : copyGoods;
}

export const App: React.FC = () => {
  const [sortType, setsortType] = useState<Buttons | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const preparedGoods = getPreparedGoods(
    goodsFromServer, sortType, isReversed,
  );

  const handleReset = () => {
    setsortType(null);
    setIsReversed(false);
  };

  const resetCondition = (
    sortType !== null || isReversed
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortType !== Buttons.SORT__ALPHBETICALLY },
          )}
          onClick={() => setsortType(Buttons.SORT__ALPHBETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-success',
              { 'is-light': sortType !== Buttons.SORT__BY__LENGTH },
            )
          }
          onClick={() => setsortType(Buttons.SORT__BY__LENGTH)}

        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed((current) => !current)}
        >
          Reverse
        </button>

        {resetCondition && (
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
        {preparedGoods.map(good => (
          <li
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
