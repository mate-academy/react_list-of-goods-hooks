import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  NAME = 'name',
  LENGTH = 'length',
}

export function getPreparedGoods(goods: Good[],
  { sortField, reverseList }:
  { sortField: SortType | ''; reverseList: boolean }) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.NAME:
          return good1.name.localeCompare(good2.name);
        case SortType.LENGTH:
          return good1.name.length - good2.name.length;
        default:
          return 0;
      }
    });
  }

  if (reverseList) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

type Good = {
  id: number;
  name: string;
};

const goodsFromServer: Good[] = [
  { id: 1, name: 'Dumplings' },
  { id: 2, name: 'Carrot' },
  { id: 3, name: 'Eggs' },
  { id: 4, name: 'Ice cream' },
  { id: 5, name: 'Apple' },
  { id: 6, name: 'Bread' },
  { id: 7, name: 'Fish' },
  { id: 8, name: 'Honey' },
  { id: 9, name: 'Jam' },
  { id: 10, name: 'Garlic' },
];

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, reverseList: isReversed });

  const handleReverseClick = () => {
    setIsReversed((prev) => !prev);
  };

  const handleSortClick = (type: SortType) => () => {
    setSortField(type);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SortType.NAME })}
          onClick={handleSortClick(SortType.NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SortType.LENGTH })}
          onClick={handleSortClick(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={handleReverseClick}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li data-cy="Good" key={good.id}>
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
