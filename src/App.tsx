import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

enum SortType {
  Name = 'name',
  Length = 'length',
  Default = '',
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

function getSortedGoods(
  goods: string[],
  sortBy: SortType,
  isReversed: boolean,
) {
  const visibleGoods: string[] = [...goods];

  switch (sortBy) {
    case SortType.Name:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.Length:
      visibleGoods.sort((a, b) => a.length - b.length || a.localeCompare(b));
      break;
    default:

      break;
  }

  if (isReversed) visibleGoods.reverse();

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.Default);

  const [isReversed, setIsReversed] = useState(false);

  const isDefaultOrder = sortBy === '' && isReversed === false;

  const handleSetSort = (field: SortType) => {
    setSortBy(field);
  };

  const handleReverseSort = () => {
    setIsReversed(current => !current);
  };

  const handleResetSort = () => {
    setSortBy(SortType.Default);
    setIsReversed(false);
  };

  const visibleGoods = getSortedGoods(goodsFromServer, sortBy, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortBy !== 'name',
          })}
          onClick={() => handleSetSort(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortBy !== 'length',
          })}
          onClick={() => handleSetSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', {
            'is-warning': isReversed,
            'is-light': !isReversed,
          })}
          onClick={handleReverseSort}
        >
          Reverse
        </button>

        {!isDefaultOrder && (
          <button
            type="button"
            className={'button is-danger is-light'}
            onClick={handleResetSort}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            <button type="button">
              {good}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
