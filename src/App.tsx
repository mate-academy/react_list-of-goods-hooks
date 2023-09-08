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
  'Garlic',
];

enum SortType {
  Name = 'name',
  Length = 'length',
  Default = '',
}

function getPreparedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const prepareGoods = [...goods];

  if (sortType) {
    prepareGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.Name:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1[sortType] - good2[sortType];

        default:
          return 0;
      }
    });
  }

  return isReversed
    ? prepareGoods.reverse()
    : prepareGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  const handleResetClick = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  const handleReverseClick = () => (
    setIsReversed(currentState => !currentState)
  );

  const isResetButtonVisible = (sortType || isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(SortType.Name)}
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.Name },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SortType.Length)}
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.Length },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverseClick}
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetClick}
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
