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
  None = '',
  Length = 'length',
  Alpha = 'alpha',
}

interface PropsFilter {
  sortField: SortType;
  isReversed: boolean;
}

function getPrepearedGoods(
  goods: string[],
  { sortField, isReversed }: PropsFilter,
): string[] {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((goods1, goods2) => {
      switch (sortField) {
        case SortType.Alpha:
          return goods1.localeCompare(goods2);

        case SortType.Length:
          return goods1.length - goods2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);
  const visiableGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });
  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.Alpha)}
          className={`button is-info ${sortField === SortType.Alpha ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.Length)}
          className={`button is-success ${sortField === SortType.Length ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(prev => !prev)}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {sortField !== SortType.None || isReversed === true ? (
          <button
            type="button"
            onClick={() => {
              setSortField(SortType.None);
              setIsReversed(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visiableGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
