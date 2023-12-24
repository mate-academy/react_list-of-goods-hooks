import React, { useState } from 'react';
import cn from 'classnames';
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

enum Sort {
  name = 'name',
  length = 'length',
}

interface SortParams {
  sortField: Sort | '';
  isReversed: boolean;
}

function getPreparedGoods(goods: string[],
  { sortField, isReversed }: SortParams): string[] {
  const preparedGoods = [...goods];

  if (sortField === Sort.name) {
    preparedGoods.sort((prod1, prod2) => prod1.localeCompare(prod2));
  }

  if (sortField === Sort.length) {
    preparedGoods.sort(
      (product1, product2) => product1.length - product2.length,
    );
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<Sort | ''>('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const isChanged = sortField !== '' || isReversed;

  const onReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            { 'is-light': sortField !== Sort.name },
            'button is-info',
          )}
          onClick={() => {
            setSortField(Sort.name);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            { 'is-light': sortField !== Sort.length },
            'button is-success',
          )}
          onClick={() => {
            setSortField(Sort.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            { 'is-light': isReversed === false },
            'button is-warning',
          )}
          onClick={() => {
            setIsReversed((prevIsReversed) => !prevIsReversed);
          }}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((item) => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
