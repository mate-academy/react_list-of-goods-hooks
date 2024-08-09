import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

enum SortType {
  SORT_ALPHABET = 'alphabet',
  SORT_LENGTH = 'length',
}

const handleSort = (type: SortType | '', isReversed: boolean): string[] => {
  const sortedGoods = [...goodsFromServer];

  switch (type) {
    case SortType.SORT_ALPHABET:
      sortedGoods.sort((goods1, goods2) => goods1.localeCompare(goods2));
      break;

    case SortType.SORT_LENGTH:
      sortedGoods.sort((goods1, goods2) => goods1.length - goods2.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [isReversed, setReversed] = useState<boolean>(false);
  const [sortType, setsortType] = useState<SortType | ''>('');

  const sortedGoods: string[] = handleSort(sortType, isReversed);
  const shouldShowResetButton = sortType || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(`button is-info`, {
            'is-light': sortType !== SortType.SORT_ALPHABET,
          })}
          onClick={() => setsortType(SortType.SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(`button is-success`, {
            'is-light': sortType !== SortType.SORT_LENGTH,
          })}
          onClick={() => setsortType(SortType.SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(`button is-warning`, {
            'is-light': !isReversed,
          })}
          onClick={() => setReversed(!isReversed)}
        >
          Reverse
        </button>

        {shouldShowResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setsortType('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
