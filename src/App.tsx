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

enum SortField {
  Alphabet = 'alphabet',
  Length = 'length',
}

type StateType = {
  sortField: string,
  isReverse: boolean,
};

type Func = (
  goods: string[],
  { sortField, isReverse }: StateType
) => string[];

const getPreparedGoods: Func = (goods, { sortField, isReverse }) => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.Alphabet:
          return good1.localeCompare(good2);
        case SortField.Length:
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
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const goods = getPreparedGoods(goodsFromServer, { sortField, isReverse });

  const doSort = (sort: string) => () => setSortField(sort);
  const doReverse = () => setIsReverse(!isReverse);

  const reset = () => {
    setSortField('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={doSort(SortField.Alphabet)}
          type="button"
          className={
            cn('button is-info', { 'is-light': sortField !== 'alphabet' })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={doSort(SortField.Length)}
          type="button"
          className={
            cn('button is-success', { 'is-light': sortField !== 'length' })
          }
        >
          Sort by length
        </button>

        <button
          onClick={doReverse}
          type="button"
          className={
            cn('button is-warning', { 'is-light': !isReverse })
          }
        >
          Reverse
        </button>

        {(isReverse || sortField)
          && (
            <button
              onClick={reset}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
