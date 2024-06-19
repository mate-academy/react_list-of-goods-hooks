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
  Alphabetic = 'Alphabetic',
  Length = 'Length',
  Empty = '',
}

interface SortParams {
  list: string[];
  sortBy: SortType | '';
  reverse: boolean;
}

const sortGoods = ({ list, sortBy, reverse }: SortParams) => {
  const preparedList = [...list];

  if (sortBy) {
    switch (sortBy) {
      case SortType.Alphabetic:
        preparedList.sort((good1, good2) => good1.localeCompare(good2));
        break;

      case SortType.Length:
        preparedList.sort((good1, good2) => good1.length - good2.length);
        break;

      default:
        break;
    }
  }

  if (reverse) {
    preparedList.reverse();
  }

  return preparedList;
};

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortLabel, setSortLabel] = useState(SortType.Empty);
  const isResetable = sortLabel !== SortType.Empty || isReversed !== false;

  const sortedList = sortGoods({
    list: goodsFromServer,
    sortBy: sortLabel,
    reverse: isReversed,
  });

  const resetGoods = () => {
    setIsReversed(false);
    setSortLabel(SortType.Empty);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortLabel(SortType.Alphabetic)}
          className={classNames('button is-info', {
            'is-light': sortLabel !== SortType.Alphabetic,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortLabel !== SortType.Length,
          })}
          onClick={() => setSortLabel(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {isResetable && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {sortedList.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
