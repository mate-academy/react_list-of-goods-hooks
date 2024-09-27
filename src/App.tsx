import 'bulma/css/bulma.css';
import cn from 'classnames';

import { FC, useState } from 'react';
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
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  DEFAULT = '',
}

const getPreparedGoods = (
  goods: string[],
  sortField: SortType,
  isReverseGoods: boolean,
) => {
  const prepareGoods = [...goods];

  if (sortField) {
    prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);
        case SortType.LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverseGoods) {
    prepareGoods.reverse();
  }

  return prepareGoods;
};

export const App: FC = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [isReverseGoods, setIsReverseGoods] = useState(false);

  const isResetSorting = sortField || isReverseGoods;

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    isReverseGoods,
  );

  const handleResetSort = () => {
    setSortField(SortType.DEFAULT);
    setIsReverseGoods(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.ALPHABET)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReverseGoods(!isReverseGoods)}
          type="button"
          className={cn('button is-warning', { 'is-light': !isReverseGoods })}
        >
          Reverse
        </button>

        {isResetSorting && (
          <button
            onClick={() => handleResetSort()}
            type="button"
            className="button is-danger is-light"
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
