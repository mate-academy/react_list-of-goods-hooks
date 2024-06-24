import React, { useState } from 'react';
import cn from 'classnames';
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
  SORT_FIELD_ALPHABETICALY = 'alphabeticaly',
  SORT_FIELD_BY_LENGHT = 'lenght',
}

type SortOptions = {
  sortField: SortType | '';
  isReversed: boolean;
};

const getPreparedGoods = (
  goods: string[],
  { sortField, isReversed }: SortOptions,
): string[] => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      const sortOder =
        sortField === SortType.SORT_FIELD_ALPHABETICALY
          ? a.localeCompare(b)
          : a.length - b.length;

      return sortOder;
    });
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const reset = (): void => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cn({
            'is-light': sortField !== SortType.SORT_FIELD_ALPHABETICALY,
          })}`}
          onClick={() => setSortField(SortType.SORT_FIELD_ALPHABETICALY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${cn({
            'is-light': sortField !== SortType.SORT_FIELD_BY_LENGHT,
          })}`}
          onClick={() => setSortField(SortType.SORT_FIELD_BY_LENGHT)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': !isReversed })}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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
