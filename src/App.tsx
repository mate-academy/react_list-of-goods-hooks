import React, { useState } from 'react';
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
  ALPHABETIC = 'alphabetically',
  LENGTH = 'length',
  DEFAULT = '',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  const compare = (value1: string, value2: string): number => {
    switch (sortField) {
      case SortType.ALPHABETIC:
        return value1.localeCompare(value2);
      case SortType.LENGTH:
        return value1.length - value2.length;
      default:
        return 0;
    }
  };

  preparedGoods.sort(compare);

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.DEFAULT);
  const [goods] = useState<string[]>([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const visibleGoods = getPreparedGoods(goods, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SortType.ALPHABETIC);
            setShowReset(true);
          }}
          className={
            SortType.ALPHABETIC === sortField
              ? 'button is-info'
              : 'button is-info is-light'
          }
          type="button"
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SortType.LENGTH);
            setShowReset(true);
          }}
          className={
            SortType.LENGTH === sortField
              ? 'button is-success'
              : 'button is-success is-light'
          }
          type="button"
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            const newIsReversed = !isReversed;

            setIsReversed(newIsReversed);

            if (sortField === SortType.DEFAULT && newIsReversed === false) {
              setShowReset(false);
            } else {
              setShowReset(true);
            }
          }}
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
          type="button"
        >
          Reverse
        </button>

        {showReset && (
          <button
            onClick={() => {
              setSortField(SortType.DEFAULT);
              setIsReversed(false);
              setShowReset(false);
            }}
            className="button is-danger is-light"
            type="button"
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
