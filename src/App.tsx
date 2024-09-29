import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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

enum SortOption {
  default = 'default',
  alphabetically = 'alphabetically',
  byLength = 'byLength',
}

interface SortParams {
  sortOption: SortOption;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortOption, isReversed }: SortParams,
) {
  const preparedGoods = [...goods];
  console.log('dick');

  if (sortOption) {
    preparedGoods.sort((good1, good2) => {
      switch (sortOption) {
        case SortOption.alphabetically:
          return good1.localeCompare(good2);
        case SortOption.byLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.default);
  const [isReversed, setIsReversed] = useState(false);

  const handleReset = () => {
    setSortOption(SortOption.default);
    setIsReversed(false);
  };

  const goods = getPreparedGoods(goodsFromServer, {
    sortOption,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortOption(SortOption.alphabetically)}
          className={classNames('button is-info', {
            'is-light': sortOption !== SortOption.alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortOption(SortOption.byLength)}
          className={classNames('button is-success', {
            'is-light': sortOption !== SortOption.byLength,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(!isReversed)}
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortOption !== SortOption.default || isReversed) && (
          <button
            type="button"
            onClick={() => handleReset()}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
