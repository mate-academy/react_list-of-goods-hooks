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

enum SortBy {
  sortByAlphabet = 'alphabet',
  sortByLength = 'length',
}

const sortGoods = (sortBy: string) => {
  const copy = [...goodsFromServer];

  switch (sortBy) {
    case SortBy.sortByAlphabet:
      return copy.sort((good1, good2) => good1.localeCompare(good2));

    case SortBy.sortByLength:
      return copy.sort((good1, good2) => good1.length - good2.length);

    default:
      return copy;
  }
};

export const App = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const preparedGoods: string[] = sortGoods(sortBy);

  const resetSorting = () => {
    setIsReversed(false);
    setSortBy('');
  };

  if (isReversed) {
    preparedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', ['is-info'], {
            'is-light': sortBy !== SortBy.sortByAlphabet,
          })}
          onClick={() => setSortBy(SortBy.sortByAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', ['is-success'], {
            'is-light': sortBy !== SortBy.sortByLength,
          })}
          onClick={() => setSortBy(SortBy.sortByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', ['is-warning'], {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSorting}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
