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

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
}

interface SortOptions {
  sortField: SortType | '';
  isReverse: boolean;
}

function getPreparedGoods(goods:string[], { sortField, isReverse }:SortOptions):string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App:React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods
    = getPreparedGoods(goodsFromServer, { sortField, isReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {'is-light': sortField !== SortType.Alphabet})}
          onClick={() => setSortField(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {'is-light': sortField !== SortType.Length})}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning', {'is-light': isReverse !== true})}
          onClick={() => (setIsReverse(!isReverse))}
        >
          Reverse
        </button>

        {(sortField !== '' || isReverse) && (
          <button
            onClick={() => {
              setSortField('');
              setIsReverse(false);
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
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))
        }
      </ul>
    </div>
  );
};