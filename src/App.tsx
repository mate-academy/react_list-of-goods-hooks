import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classnames from 'classnames';

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
  SORT_BY_LENGTH = 'length',
  SORT_BY_ALPHABET = 'alpha',
  initialSortField = '',
}

function sortBy(fieldForSort: SortType, isReversed: boolean): string[] {
  const goods = [...goodsFromServer];

  if (fieldForSort) {
    switch (fieldForSort) {
      case SortType.SORT_BY_ALPHABET:
        goods.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.SORT_BY_LENGTH:
        goods.sort((a, b) => a.length - b.length);
        break;

      default:
        break;
    }
  }

  return isReversed ? goods.reverse() : goods;
}

export const App: React.FC = () => {
  const [isReverseActive, setIsReverseActive] = useState(false);
  const [sortField, setSortField] = useState(SortType.initialSortField);

  const preparedGoods: string[] = sortBy(sortField, isReverseActive);

  const resetAllSort = (): void => {
    setIsReverseActive(false);
    setSortField(SortType.initialSortField);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SortType.SORT_BY_ALPHABET);
            sortBy(SortType.SORT_BY_ALPHABET, isReverseActive);
          }}
          type="button"
          className={
            classnames('button',
              'is-info',
              { 'is-light': sortField !== SortType.SORT_BY_ALPHABET })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SortType.SORT_BY_LENGTH);
            sortBy(SortType.SORT_BY_LENGTH, isReverseActive);
          }}
          type="button"
          className={
            classnames('button',
              'is-success',
              { 'is-light': sortField !== SortType.SORT_BY_LENGTH })
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReverseActive(!isReverseActive);
          }}
          type="button"
          className={
            classnames(
              'button',
              'is-warning',
              { 'is-light': !isReverseActive },
            )
          }
        >
          Reverse
        </button>

        {(sortField || isReverseActive) && (
          <button
            onClick={() => resetAllSort()}
            type="button"
            className={
              classnames(
                'button',
                'is-danger',
                { 'is-light': true },
              )
            }
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
