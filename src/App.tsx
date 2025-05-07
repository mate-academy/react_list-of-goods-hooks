import React, { useState } from 'react';
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

enum SortType {
  ALPHABETICALLY = 'alphabetically',
  LENGTH = 'length',
  DEFAULT = '',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  const compare = (a: string, b: string): number => {
    switch (sortField) {
      case SortType.ALPHABETICALLY:
        return a.localeCompare(b);
      case SortType.LENGTH:
        return a.length - b.length;
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
  const [isReversed, setIsReversed] = useState(false);
  const [goods] = useState<string[]>([...goodsFromServer]);

  const visibleGoods = getPreparedGoods(goods, sortField, isReversed);

  return (
    <>
      <div className="section content">
        <div className="buttons"></div>
        <button
          onClick={() => setSortField(SortType.ALPHABETICALLY)}
          className={
            SortType.ALPHABETICALLY === sortField
              ? 'button is-info'
              : 'button is-info is-light'
          }
          type="button"
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortField(SortType.LENGTH)}
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
          onClick={() => setIsReversed(prev => !prev)}
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
          type="button"
        >
          {' '}
          Reverse
        </button>
        {(sortField || isReversed) && (
          <button
            onClick={() => {
              setSortField(SortType.DEFAULT);
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
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
    </>
  );
};
