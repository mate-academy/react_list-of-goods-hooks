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
  None = '',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

const getSortedGoods = (
  goods: string[],
  sortType: SortType,
  reversed: boolean,
): string[] => {
  const sortedGoods = [...goods];

  sortedGoods.sort((a, b) => {
    switch (sortType) {
      case SortType.Alphabetically:
        return a.localeCompare(b);
      case SortType.Length:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [reversed, setReversed] = useState(false);
  const [sortValue, setActiveButton] = useState<SortType>(SortType.None);

  const sortGoods = (type: SortType) => {
    setActiveButton(type);
  };

  const toggleReverse = () => {
    setReversed(!reversed);
  };

  const resetGoods = () => {
    setReversed(false);
    setActiveButton(SortType.None);
  };

  const sortedGoods = getSortedGoods(goodsFromServer, sortValue, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortValue !== SortType.Alphabetically,
          })}
          onClick={() => {
            sortGoods(SortType.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortValue !== SortType.Length,
          })}
          onClick={() => {
            sortGoods(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(sortValue !== SortType.None || reversed) && (
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
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
