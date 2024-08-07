import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  SORT_BY_FIRST_LETTER = 'byLetter',
  SORT_BY_GOOD_LENGTH = 'byLength',
  RESET_SORTING = '',
}

function getSortedGoods(
  goodsList: string[],
  sortField: SortType,
  reversed: boolean,
) {
  let goodsListCopy = [...goodsList];

  if (sortField) {
    goodsListCopy.sort((good1: string, good2: string): number => {
      switch (sortField) {
        case SortType.SORT_BY_FIRST_LETTER:
          return good1.localeCompare(good2);
        case SortType.SORT_BY_GOOD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    goodsListCopy = [...goodsListCopy].reverse();
  }

  return goodsListCopy;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.RESET_SORTING);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const renderedGoods = getSortedGoods(goodsFromServer, sortField, isReversed);
  const isListModified = sortField || isReversed;
  const resetGoodsListToDefault = () => {
    setSortField(SortType.RESET_SORTING);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_BY_FIRST_LETTER,
          })}
          onClick={() => setSortField(SortType.SORT_BY_FIRST_LETTER)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.SORT_BY_GOOD_LENGTH,
          })}
          onClick={() => setSortField(SortType.SORT_BY_GOOD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(prev => !prev);
          }}
        >
          Reverse
        </button>

        {isListModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoodsListToDefault}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {renderedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
