import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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
  SORT_BY_ALPHABET = 'Sort alphabetically',
  SORT_BY_LENGTH = 'Sort by length',
  SORT_DEFAULT = '',
}

function getPrepareGoods(
  goods: string[], sortField: SortType, isReverse: boolean,
) {
  let prepareGoods = [...goods];

  if (sortField) {
    prepareGoods = prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_BY_ALPHABET:
          return good1.localeCompare(good2);
        case SortType.SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    return prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.SORT_DEFAULT);
  const [isReverse, setReverse] = useState(false);
  const getListOfGoods = getPrepareGoods(
    goodsFromServer, sortField, isReverse,
  );

  const handleClickSortName = () => {
    setSortField(SortType.SORT_BY_ALPHABET);
  };

  const handleClickSortLength = () => {
    setSortField(SortType.SORT_BY_LENGTH);
  };

  const handleReverseClick = () => {
    setReverse(prev => !prev);
  };

  const resetClick = () => {
    setSortField(SortType.SORT_DEFAULT);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleClickSortName}
          type="button"
          className={
            cn('button is-info',
              { 'is-light': sortField !== SortType.SORT_BY_ALPHABET })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleClickSortLength}
          type="button"
          className={
            cn('button is-success',
              { 'is-light': sortField !== SortType.SORT_BY_LENGTH })
          }
        >
          Sort by length
        </button>

        <button
          onClick={handleReverseClick}
          type="button"
          className={
            cn('button is-warning',
              { 'is-light': !isReverse })
          }
        >
          Reverse
        </button>

        {(isReverse || sortField !== '') && (
          <button
            onClick={resetClick}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {getListOfGoods.map(good => (
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
