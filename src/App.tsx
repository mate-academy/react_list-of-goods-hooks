import React from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
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

enum SortType {
  sortAlphabetically = 'Sort alphabetically',
  sortByLength = 'Sort by length',
  defolt = '',
}

function getSortedList(sign: SortType, reverse: boolean) {
  let newList = [...goodsFromServer];

  if (reverse) {
    newList = [...goodsFromServer].reverse();

    if (sign) {
      switch (sign) {
        case SortType.sortAlphabetically:
          return [...goodsFromServer].sort((first, second) => {
            return second.localeCompare(first);
          });

        case SortType.sortByLength:
          return [...goodsFromServer].sort((first, second) => {
            if (second.length === first.length) {
              return second.localeCompare(first);
            }

            return second.length - first.length;
          });

        default:
          break;
      }
    }
  } else {
    switch (sign) {
      case SortType.sortAlphabetically:
        return [...goodsFromServer]
          .sort((first, second) => {
            return second.localeCompare(first);
          })
          .reverse();

      case SortType.sortByLength:
        return [...goodsFromServer]
          .sort((first, second) => {
            if (second.length === first.length) {
              return second.localeCompare(first);
            }

            return second.length - first.length;
          })
          .reverse();

      default:
        break;
    }
  }

  return newList;
}

export const App = () => {
  const [sortSign, setSortSign] = useState(SortType.defolt);
  const [reverse, setReverseSortList] = useState(false);
  const newSortList = getSortedList(sortSign, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortSign(SortType.sortAlphabetically)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortSign !== SortType.sortAlphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortSign(SortType.sortByLength)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortSign !== SortType.sortByLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseSortList(!reverse)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>

        {sortSign || reverse ? (
          <button
            onClick={() => {
              setSortSign(SortType.defolt);
              setReverseSortList(false);
            }}
            type="button"
            className={cn('button is-danger is-light')}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {newSortList.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
