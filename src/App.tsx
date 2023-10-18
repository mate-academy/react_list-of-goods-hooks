import { useState } from 'react';
import cn from 'classnames';
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

// const SORT_FIELD_ALPHABET = 'alphabet';
// const SORT_FIELD_LENGTH = 'length';

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
  NoSort = 'no sort',
}

interface ObjectOfChanges {
  sortType: SortType;
  isReverse: boolean;
}

function getSortedGoods(
  listOfGoods: string[],
  { sortType, isReverse }: ObjectOfChanges,
) {
  const copyOfGoods = [...listOfGoods];

  copyOfGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.Alphabet:
        return good1.localeCompare(good2);
      case SortType.Length:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReverse === true) {
    copyOfGoods.reverse();
  }

  return copyOfGoods;
}

export const App = () => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NoSort);
  const sortedGoods
  = getSortedGoods(goodsFromServer, { sortType, isReverse });
  const reset = () => {
    setSortType(SortType.NoSort);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.Alphabet },
          )}
          onClick={() => {
            setSortType(SortType.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.Length },
          )}
          onClick={() => {
            setSortType(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': isReverse === false },
          )}
          onClick={() => setIsReverse(!isReverse)} // altered into a simpler expression
        >
          Reverse
        </button>

        {(sortType !== 'no sort' || isReverse === true) && (
          <button
            type="button"
            className={cn(
              'button',
              'is-danger',
              'is-light',
            )}
            onClick={reset} // made into separate function
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
