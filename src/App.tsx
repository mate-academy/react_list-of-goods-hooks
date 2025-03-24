import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cs from 'classnames';
import React from 'react';

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
  SORT_ALPHABETICALLY = 'alphabetically',
  SORT_LENGTH = 'length',
  SORT_REVERSE = 'reverse',
}

export const App = () => {
  const [currentGoods, setCurrentGoods] = useState<string[]>([
    ...goodsFromServer,
  ]);
  const [field, setField] = useState<string | null>(null);
  const [reversed, setReversed] = useState<boolean>(false);

  function sortingGoods(fieldValue: string) {
    const sortedGoods = [...currentGoods];

    if (fieldValue === SortType.SORT_ALPHABETICALLY) {
      if (reversed === false) {
        sortedGoods.sort((a, b) => a.localeCompare(b));
      } else {
        sortedGoods.sort((a, b) => b.localeCompare(a));
      }
    }

    if (fieldValue === SortType.SORT_LENGTH) {
      if (reversed === false) {
        sortedGoods.sort((a, b) => a.length - b.length);
      } else {
        sortedGoods.sort((a, b) => b.length - a.length);
      }
    }

    if (fieldValue === SortType.SORT_REVERSE) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cs('button is-info', {
            'is-light': field !== SortType.SORT_ALPHABETICALLY,
          })}
          onClick={() => {
            setField(SortType.SORT_ALPHABETICALLY);
            setCurrentGoods(sortingGoods(SortType.SORT_ALPHABETICALLY));
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cs('button is-success', {
            'is-light': field !== SortType.SORT_LENGTH,
          })}
          onClick={() => {
            setField(SortType.SORT_LENGTH);
            setCurrentGoods(sortingGoods(SortType.SORT_LENGTH));
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cs('button is-warning', {
            'is-light': reversed === false,
          })}
          onClick={() => {
            if (reversed === false) {
              setReversed(true);
            } else {
              setReversed(false);
            }

            setCurrentGoods(sortingGoods(SortType.SORT_REVERSE));
          }}
        >
          Reverse
        </button>

        {JSON.stringify(currentGoods) !== JSON.stringify(goodsFromServer) && (
          <button
            type="button"
            className={cs('button is-danger', 'is-light')}
            onClick={() => {
              setReversed(false);
              setCurrentGoods([...goodsFromServer]);
              setField(null);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {currentGoods.map(good => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
