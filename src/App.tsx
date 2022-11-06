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
  ALPHABET,
  LENGTH,
  NONE,
}

export const App: React.FC = () => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortBy, setSortBy] = useState(SortType.NONE);

  const getSortedArr = (): string[] => {
    const copyOfServerArr = [...goodsFromServer];

    copyOfServerArr.sort((a: string, b: string): number => {
      switch (sortBy) {
        case SortType.ALPHABET:
          return a.localeCompare(b);
        case SortType.LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });

    if (isReverse) {
      copyOfServerArr.reverse();
    }

    return copyOfServerArr;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortBy !== SortType.ALPHABET },
          )}
          onClick={() => setSortBy(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortBy !== SortType.LENGTH },
          )}
          onClick={() => setSortBy(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReverse },
          )}
          onClick={() => setIsReverse(currentValue => !currentValue)}
        >
          Reverse
        </button>

        {
          (isReverse || sortBy !== SortType.NONE)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setIsReverse(false);
                setSortBy(SortType.NONE);
              }}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        <ul>
          {
            getSortedArr().map(product => (
              <li data-cy="Good" key={product}>{product}</li>
            ))
          }
        </ul>
      </ul>
    </div>
  );
};
