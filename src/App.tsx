import React, { useEffect, useState } from 'react';
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

enum SortType {
  Default,
  Alphabetical,
  Length,
}

export const App: React.FC = () => {
  const originalGoods = [...goodsFromServer];
  const [visibleGoods, setVisibleGoods] = useState<string[]>(originalGoods);
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReverseActive, setIsReverseActive] = useState(false);

  const sortGoods = () => {
    let sortedGoods: string[] = [...visibleGoods];

    switch (sortType) {
      case SortType.Alphabetical:
        sortedGoods = sortedGoods.sort();
        break;
      case SortType.Length:
        sortedGoods = sortedGoods.sort(
          (good1, good2) => good1.length - good2.length,
        );
        break;
      default:
        break;
    }

    if (isReverseActive) {
      sortedGoods.reverse();
    }

    setVisibleGoods(sortedGoods);
  };

  const resetGoods = () => {
    setSortType(SortType.Default);
    setIsReverseActive(false);
    setVisibleGoods(originalGoods);
  };

  useEffect(() => {
    sortGoods();
  }, [sortType, isReverseActive]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button', 'is-info',
            { 'is-light': sortType !== SortType.Alphabetical },
          )}
          onClick={() => {
            setSortType(SortType.Alphabetical);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button', 'is-success',
            { 'is-light': sortType !== SortType.Length },
          )}
          onClick={() => {
            setSortType(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button', 'is-warning',
            { 'is-light': !isReverseActive },
          )}
          onClick={() => {
            setIsReverseActive(!isReverseActive);
          }}
        >
          Reverse
        </button>

        {sortType !== SortType.Default || isReverseActive ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
