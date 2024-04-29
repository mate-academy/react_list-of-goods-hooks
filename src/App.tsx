import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

enum SortBy {
  SORT_BY_ALPHABET = 'alphabet',
  SORT_BY_LENGTH = 'length',
}

export const App: React.FC = () => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortedBtn, setSortedBtn] = useState('');
  const prepareGoods = () => {
    const newGoods = [...goodsFromServer];

    if (sortedBtn) {
      newGoods.sort((good1, good2) => {
        switch (sortedBtn) {
          case SortBy.SORT_BY_ALPHABET:
            return good1.localeCompare(good2);

          case SortBy.SORT_BY_LENGTH:
            return good1.length - good2.length;

          default:
            return 0;
        }
      });
    }

    if (isReverse) {
      newGoods.reverse();
    }

    return newGoods;
  };

  const finalGoods = prepareGoods();
  const reset = (): void => {
    setSortedBtn('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortedBtn(SortBy.SORT_BY_ALPHABET)}
          className={classNames('button is-info', {
            'is-light': sortedBtn !== SortBy.SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortedBtn(SortBy.SORT_BY_LENGTH)}
          className={classNames('button is-success', {
            'is-light': sortedBtn !== SortBy.SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReverse(!isReverse)}
          className={classNames('button is-warning', {
            'is-light': !isReverse,
          })}
        >
          Reverse
        </button>

        {(sortedBtn || isReverse) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {finalGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
