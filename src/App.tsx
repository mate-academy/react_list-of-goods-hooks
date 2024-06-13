import React, { useState } from 'react';
import classNames from 'classnames';
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
  SORT_FIELD_ALPHABETICALLY = 'alphabetically',
  SORT_FIELD_BYLENGTH = 'length',
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
      const sortOrder =
        sortField === SortType.SORT_FIELD_ALPHABETICALLY
          ? a.localeCompare(b)
          : a.length - b.length;

      return sortOrder;
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
          onClick={() => setSortField(SortType.SORT_FIELD_ALPHABETICALLY)}
          type="button"
          className={`button is-info ${classNames({ 'is-light': sortField !== SortType.SORT_FIELD_ALPHABETICALLY })}`}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortField(SortType.SORT_FIELD_BYLENGTH)}
          type="button"
          className={`button is-success ${classNames({ 'is-light': sortField !== SortType.SORT_FIELD_BYLENGTH })}`}
        >
          Sort by length
        </button>
        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={`button is-warning ${classNames({ 'is-light': !isReversed })}`}
        >
          Reverse
        </button>
        {(sortField || isReversed) && (
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
