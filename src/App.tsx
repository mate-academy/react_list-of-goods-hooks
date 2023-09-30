import React from 'react';
import cn from 'classnames';

import { GoodsList } from './components/GoodsList';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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
  length = 'length',
  alphabet = 'alphabet',
}

function getPreparedGoods(
  goodsList: string[],
  sortField: string,
  isReversed: boolean,
): string[] {
  const preparedGoods: string[] = [...goodsList];

  if (sortField) {
    preparedGoods.sort((firstGood: string, secondGood: string) => {
      switch (sortField) {
        case SortType.length:
          return firstGood.length - secondGood.length;

        case SortType.alphabet:
          return firstGood.localeCompare(secondGood);

        default:
          return 0;
      }
    });
  }

  return isReversed
    ? preparedGoods.reverse()
    : preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = React.useState('');
  const [isReversed, setIsReversed] = React.useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.alphabet,
          })}
          onClick={() => setSortField(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField !== '' || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortField('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
