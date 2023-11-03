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
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

interface SortGoods {
  sortBy: string,
  sortRevers: boolean,
}

const SORT_GOODS_IS_LIGHT = 'is-light';

function sortGoods(arrGoods: string[], { sortBy, sortRevers }: SortGoods) {
  const newArrGoods = [...arrGoods];

  if (sortBy) {
    newArrGoods.sort((a, b) => {
      switch (sortBy) {
        case SortType.ALPHABET:
          return a.localeCompare(b);
        case SortType.LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (sortRevers) {
    return newArrGoods.reverse();
  }

  return newArrGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState('');
  const [sortRevers, setSortRevers] = useState(false);

  const newSorted = sortGoods(goodsFromServer, { sortBy, sortRevers });

  const reset = () => {
    setSortBy('');
    setSortRevers(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy('alphabet')}
          type="button"
          className={classNames('button', 'is-info', {
            [SORT_GOODS_IS_LIGHT]: sortBy !== 'alphabet',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy('length')}
          type="button"
          className={classNames('button', 'is-success', {
            [SORT_GOODS_IS_LIGHT]: sortBy !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setSortRevers(curr => !curr)}
          type="button"
          className={classNames('button', 'is-warning', {
            [SORT_GOODS_IS_LIGHT]: !sortRevers,
          })}
        >
          Reverse
        </button>

        {(sortBy || sortRevers) && (
          <button
            onClick={reset}
            type="button"
            className={`button is-danger ${SORT_GOODS_IS_LIGHT}`}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {newSorted.map(good => (
            <li key={good} data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
