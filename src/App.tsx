import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

import { useState } from 'react';
import GoodList from './components/GoodList/GoodList';

const goodsFromServer = [
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

const SORT_ALPHABET = 'alphabet';
const SORT_LENGTH = 'length';

enum SortType {
  alphabet = SORT_ALPHABET,
  length = SORT_LENGTH,
}

type SortOptions = {
  sortField: SortType | '',
  isReverse: boolean,
}

function getPreparedGoods(goods: string[], options: SortOptions): string[] {
  const { sortField, isReverse } = options;
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      if (sortField === SortType.alphabet) {
        return good1.localeCompare(good2);
      }

      if (sortField === SortType.length) {
        return good1.length - good2.length;
      }

      return 0;
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortField, setSortField] = useState<SortType | ''>('');
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            `button is-info ${sortField === SORT_ALPHABET ? '' : 'is-light'}`,
          )}
          onClick={() => {
            setSortField(SortType.alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            `button is-info ${sortField === SORT_LENGTH ? '' : 'is-light'}`,
          )}
          onClick={() => {
            setSortField(SortType.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(`button is-info ${isReverse ? '' : 'is-light'}`)}
          onClick={() => {
            setIsReverse(!isReverse);
          }}
        >
          Reverse
        </button>

        {sortField || isReverse ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
