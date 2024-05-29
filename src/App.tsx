import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';

enum SortType {
  sortFieldAlphabetically = 'Sort_alphabetically',
  sortFieldByLength = 'Sort_by_length'
}

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

type Props = {
  sortField: SortType | '',
  isReversedField: boolean,
}

function getPrepearedGoods(goods: string[], { sortField, isReversedField }: Props) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.sortFieldAlphabetically:
          return good1.localeCompare(good2);

        case SortType.sortFieldByLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversedField) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [isReversedField, setIsReversedField] = useState(false);
  const visibleGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    isReversedField,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.sortFieldAlphabetically)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.sortFieldAlphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.sortFieldByLength)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.sortFieldByLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversedField(!isReversedField);
          }}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversedField,
          })}
        >
          Reverse
        </button>

        {(sortField || isReversedField) && (
          <button
            onClick={() => {
              setSortField('');
              setIsReversedField(false);
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
