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
];

enum SortingParams {
  Name = 'name',
  Length = 'length',
  Default = '',
}

interface SortOptions {
  option: SortingParams,
  reversed: boolean,
}

const getVisibleGoods = (
  goods: typeof goodsFromServer,
  { option, reversed }: SortOptions,
) => {
  const visibleGoods = [...goods];

  if (option) {
    visibleGoods.sort((good1, good2) => {
      switch (option) {
        case SortingParams.Name:
          return good1.localeCompare(good2);
        case SortingParams.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
};

export const App: React.FC = () => {
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    option: SortingParams.Default,
    reversed: false,
  });

  const visibleGoods = getVisibleGoods(
    goodsFromServer,
    sortOptions,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortOptions.option !== SortingParams.Name },
          )}
          onClick={() => setSortOptions({
            ...sortOptions,
            option: SortingParams.Name,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortOptions.option !== SortingParams.Length },
          )}
          onClick={() => setSortOptions({
            ...sortOptions,
            option: SortingParams.Length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !sortOptions.reversed },
          )}
          onClick={() => setSortOptions({
            ...sortOptions,
            reversed: !sortOptions.reversed,
          })}
        >
          Reverse
        </button>

        {JSON.stringify(visibleGoods) !== JSON.stringify(goodsFromServer)
        && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortOptions({
              option: SortingParams.Default,
              reversed: false,
            })}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
