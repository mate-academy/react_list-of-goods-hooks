import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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

const getVisibleGoods = (
  goods: string[],
  currentSortType: SortType,
  isReversed: boolean,
): string[] => {
  const goodsCopy = [...goods];

  switch (currentSortType) {
    case 'alphabetical':
      goodsCopy.sort((a, b) => a.localeCompare(b));
      break;
    case 'byLength':
      goodsCopy.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    goodsCopy.reverse();
  }

  return goodsCopy;
};

type SortType = 'alphabetical' | 'byLength' | null;

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(null);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = getVisibleGoods(goodsFromServer, sortType, isReversed);

  const resetOrder = () => {
    setSortType(null);
    setIsReversed(false);
  };

  const shouldRenderResetButton = sortType !== null || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== 'alphabetical',
          })}
          onClick={() => setSortType('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== 'byLength',
          })}
          onClick={() => setSortType('byLength')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {shouldRenderResetButton && (
          <button
            type="button"
            className={classNames('button', 'is-danger')}
            onClick={resetOrder}
            data-testid="reset-button"
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
