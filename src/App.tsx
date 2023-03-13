import { FC, useState } from 'react';
import classNames from 'classnames';
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

enum Sort {
  ALPHABET,
  LENGTH,
  NONE,
}

function sortGoodsFromServer(
  arrayGoods: string[],
  sortBy: Sort,
  reverse: boolean,
) {
  const cloneArray = [...arrayGoods];

  cloneArray.sort((good1, good2) => {
    switch (sortBy) {
      case Sort.ALPHABET:
        return good1.localeCompare(good2);

      case Sort.LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (reverse) {
    cloneArray.reverse();
  }

  return cloneArray;
}

export const App: FC = () => {
  const [reverse, setReverse] = useState(false);
  const [sort, setSort] = useState(Sort.NONE);
  const visibleGoods = sortGoodsFromServer(goodsFromServer, sort, reverse);

  const reverseVisibleGoods = () => {
    setReverse(!reverse);
  };

  const sortByAlphabet = () => {
    setSort(Sort.ALPHABET);
  };

  const sortByLength = () => {
    setSort(Sort.LENGTH);
  };

  const reset = () => {
    setSort(Sort.NONE);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sort !== Sort.ALPHABET },
          )}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sort !== Sort.LENGTH },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !reverse },
          )}
          onClick={reverseVisibleGoods}
        >
          Reverse
        </button>

        {(sort !== Sort.NONE || reverse) && (
          <button
            type="button"
            className="button is-danger"
            onClick={reset}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li key={good} data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
