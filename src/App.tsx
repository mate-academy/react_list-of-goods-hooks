import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

enum Sort {
  alphabet = 'alphabet',
  length = 'length',
}

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

function getSortedProducts(
  goods: string[],
  { sort, isReversed }: { sort: Sort; isReversed: boolean },
): string[] {
  const sortedProducts = [...goods];

  sortedProducts.sort((good1, good2) => {
    switch (sort) {
      case Sort.alphabet:
        return good1.localeCompare(good2);
      case Sort.length:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    return sortedProducts.reverse();
  }

  return sortedProducts;
}

export const App: React.FC = () => {
  const [sort, setSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortedProducts: string[] = getSortedProducts(goodsFromServer, {
    sort: sort as Sort,
    isReversed,
  });

  const handleReset = () => {
    setSort('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sort !== Sort.alphabet,
          })}
          onClick={() => setSort(Sort.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sort !== Sort.length,
          })}
          onClick={() => setSort(Sort.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': isReversed === false,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {sort === '' && isReversed === false ? (
          ''
        ) : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {sortedProducts.map((good, id) => (
            <li key={id} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
