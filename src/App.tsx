import React, { useState } from 'react';
import classNames from 'classnames';
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
  None,
  Alphabetical,
  Length,
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortGoods = (goods: string[], type: SortType): string[] => {
    switch (type) {
      case SortType.Alphabetical:
        return [...goods].sort((a, b) => a.localeCompare(b));
      case SortType.Length:
        return [...goods].sort((a, b) => a.length - b.length);
      default:
        return goods;
    }
  };

  const reverseOrder = (goods: string[]): string[] => [...goods].reverse();

  const reset = (): void => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  const isResetVisible: boolean = sortType !== SortType.None || isReversed;

  const getVisibleGoods = (): string[] => {
    let visibleGoods: string[] = [...goodsFromServer];

    if (sortType !== SortType.None) {
      visibleGoods = sortGoods(visibleGoods, sortType);
    }

    if (isReversed) {
      visibleGoods = reverseOrder(visibleGoods);
    }

    return visibleGoods;
  };

  const handleSortByLengthClick = (): void => {
    setSortType(SortType.Length);
  };

  const handleSortAlphabetically = (): void => {
    setSortType(SortType.Alphabetical);
  };

  const visibleGoods = getVisibleGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.Alphabetical,
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={handleSortByLengthClick}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button type="button" className="button is-danger" onClick={reset}>
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
