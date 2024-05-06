import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';

import './App.scss';
import { GoodList } from './GoodList/GoodList';
import { Props } from './types/ListProps';
import { SortField } from './types/SortField';

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

function getSortedList(
  initialList: string[],
  { sortField, reversedList }: Props,
): string[] {
  const visibleGoods = [...initialList];

  if (sortField) {
    switch (sortField.field) {
      case 'alph':
        visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      case 'len':
        visibleGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      default:
    }
  }

  if (reversedList) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [reversedList, setReversedList] = useState(false);

  return (
    <>
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={cn('button is-info', {
              'is-light': sortField?.field !== 'alph',
            })}
            onClick={() => {
              setSortField({ field: 'alph' });
            }}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={cn('button is-success', {
              'is-light': sortField?.field !== 'len',
            })}
            onClick={() => {
              setSortField({ field: 'len' });
            }}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={cn('button is-warning', {
              'is-light': !reversedList,
            })}
            onClick={() => setReversedList(!reversedList)}
          >
            Reverse
          </button>

          {(sortField || reversedList) && (
            <button
              type="button"
              className={cn('button is-danger', {
                'is-light': sortField || reversedList,
              })}
              onClick={() => {
                setSortField(null);
                setReversedList(false);
              }}
            >
              Reset
            </button>
          )}
        </div>

        <GoodList
          goods={getSortedList(goodsFromServer, { sortField, reversedList })}
        />
      </div>
    </>
  );
};
