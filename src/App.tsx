import React, { useMemo, useState } from 'react';
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

export enum SortType {
  Default = 'default',
  Alphabetically = 'alphabetically',
  ByLength = 'byLength',
}

const getVisibleGoods = (sortType: SortType, isReversed: boolean) => {
  const goods = [...goodsFromServer];

  switch (sortType) {
    case SortType.Alphabetically:
      goods.sort((first, second) => first.localeCompare(second));
      break;
    case SortType.ByLength:
      goods.sort(
        (first, second) => first.length - second.length || first.localeCompare(second),
      );
      break;
    default:
      break;
  }

  if (isReversed) {
    goods.reverse();
  }

  return goods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = useMemo(
    () => getVisibleGoods(sortType, isReversed),
    [sortType, isReversed],
  );

  const handleReset = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.Alphabetically ? '' : 'is-light'
          }`}
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === SortType.ByLength ? '' : 'is-light'
          }`}
          onClick={() => setSortType(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed((current) => !current)}
        >
          Reverse
        </button>

        {(sortType !== SortType.Default || isReversed) && (
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
        {visibleGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
