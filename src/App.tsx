import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

enum SortType {
  SORT_ALPHABETICALLY = 'Sort alphabetically',
  SORT_BY_LENGTH = 'Sort by length',
  DEFAULT = '',
}

export const goodsFromServer = [
  { id: 1, good: 'Dumplings' },
  { id: 2, good: 'Carrot' },
  { id: 3, good: 'Eggs' },
  { id: 4, good: 'Ice cream' },
  { id: 5, good: 'Apple' },
  { id: 6, good: 'Bread' },
  { id: 7, good: 'Fish' },
  { id: 8, good: 'Honey' },
  { id: 9, good: 'Jam' },
  { id: 10, good: 'Garlic' },
];

type Good = {
  id: number;
  good: string;
};

type Parametrs = {
  sortFild: SortType;
  reverseFild: boolean;
};

function getPreparedGoods(
  goods: Good[],
  { sortFild, reverseFild }: Parametrs,
): Good[] {
  const preparedGoods = [...goods];

  if (sortFild) {
    preparedGoods.sort(({ good: good1 }, { good: good2 }) => {
      switch (sortFild) {
        case SortType.SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SortType.SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseFild) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortFild, setSortFild] = useState(SortType.DEFAULT);
  const [reverseFild, setReverseFild] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortFild, reverseFild },
  );

  const handleClick = () => {
    setSortFild(SortType.DEFAULT);
    setReverseFild(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortFild !== SortType.SORT_ALPHABETICALLY },
          )}
          onClick={() => setSortFild(SortType.SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortFild !== SortType.SORT_BY_LENGTH },
          )}
          onClick={() => setSortFild(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !reverseFild },
          )}
          onClick={() => setReverseFild(!reverseFild)}
        >
          Reverse
        </button>
        {
          (sortFild || reverseFild) && (

            <button
              type="button"
              className="button is-danger is-light"
              onClick={handleClick}
            >
              Reset
            </button>
          )
        }

      </div>

      <ul>
        <ul>
          {visibleGoods.map(({ good, id }) => (
            <li data-cy="Good" key={id}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
