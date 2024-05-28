import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';

enum SortType {
  SORT_FIELD_ALPHABETICALY = 'Sort_alphabetically',
  SORT_FIELD_BY_LENGTH = 'Sort_by_length'
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
  reverseField: boolean,
}

function getPrepearedGoods(goods: string[], { sortField, reverseField }: Props) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_FIELD_ALPHABETICALY:
          return good1.localeCompare(good2);

        case SortType.SORT_FIELD_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    reverseField,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.SORT_FIELD_ALPHABETICALY)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_FIELD_ALPHABETICALY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.SORT_FIELD_BY_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.SORT_FIELD_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReverseField(!reverseField);
          }}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverseField,
          })}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            onClick={() => {
              setSortField('');
              setReverseField(false);
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
