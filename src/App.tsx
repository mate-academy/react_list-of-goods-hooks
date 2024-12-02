import React, { useState } from 'react';
import classnames from 'classnames';
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
  Alphabet = 'name',
  Length = 'length',
}

interface SortOptions {
  sortField: string;
  reverse: boolean;
}

interface GoodListProps {
  goods: string[];
}

function getPreparedGoods(
  goods: string[],
  { sortField, reverse }: SortOptions,
): string[] {
  let preparedGoods = [...goods];

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

  if (reverse) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const GoodList: React.FC<GoodListProps> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li key={good} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<string>('');
  const [reverse, setReverse] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabet)}
          type="button"
          className={classnames('button', 'is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.Length)}
          type="button"
          className={classnames('button', 'is-success', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(prev => !prev)}
          type="button"
          className={classnames('button', 'is-warning', {
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>
        {!(sortField === '' && !reverse) && (
          <button
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
