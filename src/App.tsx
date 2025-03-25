import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';

type Goods =
  | 'Dumplings'
  | 'Carrot'
  | 'Eggs'
  | 'Ice cream'
  | 'Apple'
  | 'Bread'
  | 'Fish'
  | 'Honey'
  | 'Jam'
  | 'Garlic';

enum SortType {
  SORT_BY_ALPHABET = 'alph',
  SORT_BY_LENGTH = 'length',
  RESET = '',
}

export const goodsFromServer: Goods[] = [
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

const getPreparedGoods = (
  goods: Goods[],
  sortField: SortType[keyof SortType],
) => {
  const preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SortType.SORT_BY_ALPHABET:
        return preparedGoods.sort((good1, good2) => good1.localeCompare(good2));

      case SortType.SORT_BY_LENGTH:
        return preparedGoods.sort(
          (good1, good2) => good1.length - good2.length,
        );

      case SortType.RESET:
        return [...goods];

      default:
        return goods;
    }
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType[keyof SortType]>('');
  const [reversed, setReversed] = useState(false);

  let visibleGoods: Goods[] = getPreparedGoods(goodsFromServer, sortField);

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.SORT_BY_ALPHABET,
          })}
          onClick={() => {
            setSortField(SortType.SORT_BY_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortField(SortType.SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reversed === false,
          })}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {JSON.stringify(goodsFromServer) !== JSON.stringify(visibleGoods) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.RESET);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
