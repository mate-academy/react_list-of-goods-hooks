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
  sortByAlphabet = 'sortByAlphabet',
  sortByLength = 'sortByLength',
  initState = '',
}

const sortGoods = (sortBy: SortBy) => {
  const copy = [...goodsFromServer];

  switch (sortBy) {
    case SortBy.sortByAlphabet:
      return copy.sort((good1, good2) => good1.localeCompare(good2));

    case SortBy.sortByLength:
      return copy.sort((good1, good2) => good1.length - good2.length);

    case SortBy.initState:
      return copy;

    default:
      return 0;
  }
};

export const App = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.initState);
  const [goods, setGoods] = useState([...goodsFromServer]);

  const resetSorting = () => {
    setIsReversed(false);
    setSortBy(SortBy.initState);
    setGoods([...goodsFromServer]);
  };

  const sortOnClick = (parameter: SortBy) => {
    setSortBy(parameter);

    const sortedGoods: string[] | 0 = sortGoods(parameter);

    if (sortedGoods) {
      setGoods(sortedGoods);
    }
  };

  const setAscOrder = () => {
    sortOnClick(sortBy);
    setIsReversed(!isReversed);
  };

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', ['is-info'], {
            'is-light': sortBy !== SortBy.sortByAlphabet,
          })}
          onClick={() => sortOnClick(SortBy.sortByAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', ['is-success'], {
            'is-light': sortBy !== SortBy.sortByLength,
          })}
          onClick={() => sortOnClick(SortBy.sortByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', ['is-warning'], {
            'is-light': !isReversed,
          })}
          onClick={() => (!isReversed
            ? setIsReversed(!isReversed)
            : setAscOrder()
          )}
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
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
