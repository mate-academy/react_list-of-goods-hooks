import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

const goodsFromServer: string[] = [
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
  None = '',
  Length = 'length',
  Alphabetically = 'alphabetically',
}

const sortList = (
  goods: string[],
  sortBy: SortType,
  isReversed: boolean,
): string[] => {
  const sortedGoods = [...goods].sort((a, b) => {
    switch (sortBy) {
      case SortType.Alphabetically:
        return a.localeCompare(b);
      case SortType.Length:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [sortedBy, setSortedBy] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState<boolean>(false);

  const sortedGoods = sortList(goodsFromServer, sortedBy, reversed);

  const resetGoods = () => {
    setSortedBy(SortType.None);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortedBy !== SortType.Alphabetically,
          })}
          onClick={() => setSortedBy(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortedBy !== SortType.Length,
          })}
          onClick={() => setSortedBy(SortType.Length)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>
        {(sortedBy !== SortType.None || reversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
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
