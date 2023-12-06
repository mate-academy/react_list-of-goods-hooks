import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

interface SortingList {
  sortFilter: string,
  isReverse: boolean,
}

enum Filter {
  length = 'length',
  alphabet = 'alphabet',
}

function sortList(goods: string[], { sortFilter, isReverse }: SortingList) {
  const copyOfGoods = [...goods];

  if (sortFilter) {
    copyOfGoods.sort((good1, good2) => {
      switch (sortFilter) {
        case Filter.alphabet:
          return good1.localeCompare(good2);
        case Filter.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    copyOfGoods.reverse();
  }

  return copyOfGoods;
}

export const App: React.FC = () => {
  const [sortFilter, setSortFilter] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const sortGoods = sortList(goodsFromServer, { sortFilter, isReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortFilter !== Filter.alphabet,
          })}
          onClick={() => {
            setSortFilter(Filter.alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortFilter !== Filter.length,
          })}
          onClick={() => {
            setSortFilter(Filter.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !isReverse,
          })}
          onClick={() => {
            setIsReverse(!isReverse);
          }}
        >
          Reverse
        </button>

        {(sortFilter || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortFilter('');
              setIsReverse(false);
            }}
          >
            Reset
          </button>

        )}

      </div>

      <ul>
        <ul>
          {sortGoods.map(good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
