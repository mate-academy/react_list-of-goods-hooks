import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
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

interface Good {
  name: string;
  length: number;
  id: string;
}

interface SortType {
  sortType: SortValue | null;
  reverse: boolean;
}

enum SortValue {
  Name = 'name',
  Length = 'length',
}

function getPreparedGoods(
  goods: string[],
  { sortType, reverse }: SortType,
): Good[] {
  let preparedGoods = goods.map((good) => ({
    name: good,
    length: good.length,
    id: uuidv4(),
  }));

  if (sortType) {
    preparedGoods = preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortValue.Name:
          return good1[sortType].localeCompare(good2[sortType]);

        case SortValue.Length:
          return good1[sortType] - good2[sortType];

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>({
    sortType: null,
    reverse: false,
  });
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField);
  const updateSortFieldKey = (key: keyof SortType, newValue?: SortValue) => {
    setSortField((currentSortField) => {
      const updatedSortField = { ...currentSortField };

      if (key === 'reverse') {
        updatedSortField[key] = !updatedSortField[key];
      } else {
        updatedSortField[key] = newValue as SortValue;
      }

      return updatedSortField;
    });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField.sortType !== SortValue.Name,
          })}
          onClick={() => updateSortFieldKey('sortType', SortValue.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField.sortType !== SortValue.Length,
          })}
          onClick={() => updateSortFieldKey('sortType', SortValue.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !sortField.reverse,
          })}
          onClick={() => updateSortFieldKey('reverse')}
        >
          Reverse
        </button>

        {(sortField.sortType || sortField.reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField({
                sortType: null,
                reverse: false,
              });
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
