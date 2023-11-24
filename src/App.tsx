import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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

const SORT_BY_LENGTH = 'sortByLength';
const SORT_ALPHABET = 'SortAlphabetically';

// type SortField = 'sortByLength' | 'SortAlphabetically' | '';
enum SortField {
  without = '',
  byLength = 'sortByLength',
  byAlphabet = 'SortAlphabetically',
}

function sortBy(goods:string[], sortField: SortField, isReverse:boolean) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((curent, next) => {
      switch (sortField) {
        case SortField.byLength:
          return curent.length - next.length;
        case SortField.byAlphabet:
          return curent.localeCompare(next);
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SortField.without);
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods = sortBy(goodsFromServer, sortField, isReversed);

  const handleReverseClick = () => {
    setIsReversed(prev => !prev);
  };

  const reset = () => {
    setSortField(SortField.without);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button', 'is-info', { 'is-light': sortField !== SORT_ALPHABET },
          )}
          onClick={() => setSortField(SortField.byAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SORT_BY_LENGTH },
          )}
          onClick={() => setSortField(SortField.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button', 'is-warning', { 'is-light': !isReversed },
          )}
          onClick={handleReverseClick}
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
        {sortedGoods.map(good => (
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
