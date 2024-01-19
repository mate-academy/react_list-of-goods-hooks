import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';
import { GoodList } from './GoodList';

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
  SORT_FIELD_ALPHABET = 'alphabet',
  SORT_FIELD_BY_LENGTH = 'length',
  SORT_FIELD_RESET = '',
}

function getPreparedGoods(goods:string[], sortField:SortType, reverse:boolean) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SortType.SORT_FIELD_BY_LENGTH:
          return good1[sortField] - good2[sortField];
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField]
  = useState<SortType>(SortType.SORT_FIELD_RESET);
  const [reverse, setReverse] = useState(false);
  const readyGoods = getPreparedGoods(goodsFromServer, sortField, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.SORT_FIELD_ALPHABET,
          })}
          onClick={() => {
            setSortField(SortType.SORT_FIELD_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.SORT_FIELD_BY_LENGTH,
          })}
          onClick={() => {
            setSortField(SortType.SORT_FIELD_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>

        {(sortField !== '' || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.SORT_FIELD_RESET);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <GoodList goods={readyGoods} />
    </div>
  );
};
