import React, { useMemo, useState } from 'react';
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

export enum SortType {
  None = 'None',
  Alphabetically = 'Alphabetically',
  Length = 'Length',
}

const btnClass = (color: string, active: boolean) =>
  ['button', color, active ? '' : 'is-light'].filter(Boolean).join(' ');

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = useMemo(() => {
    const goods = [...goodsFromServer];

    switch (sortType) {
      case SortType.Alphabetically:
        goods.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.Length:
        goods.sort((a, b) => a.length - b.length);
        break;
      case SortType.None:
      default:
        break;
    }

    if (isReversed) {
      goods.reverse();
    }

    return goods;
  }, [sortType, isReversed]);

  const canReset = sortType !== SortType.None || isReversed;

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={btnClass('is-info', sortType === SortType.Alphabetically)}
          onClick={() => setSortType(SortType.Alphabetically)}
          data-cy="SortByName"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={btnClass('is-success', sortType === SortType.Length)}
          onClick={() => setSortType(SortType.Length)}
          data-cy="SortByLength"
        >
          Sort by length
        </button>

        <button
          type="button"
          className={btnClass('is-warning', isReversed)}
          onClick={handleReverse}
          data-cy="Reverse"
        >
          Reverse
        </button>

        {canReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
            data-cy="Reset"
          >
            Reset
          </button>
        )}
      </div>

      <ul data-cy="GoodsList">
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
