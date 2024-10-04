import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  DEFAULT = '',
  ALPHABETICALLY = 'alphabetically',
  LENGTH = 'length',
}

const getSortedGoods = (
  goods: string[],
  sortType: SortType,
  reversed: boolean,
): string[] => {
  const sortedGoods = [...goods];

  sortedGoods.sort((a, b) => {
    switch (sortType) {
      case SortType.ALPHABETICALLY:
        return a.localeCompare(b);
      case SortType.LENGTH:
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
  const [sortValue, setActiveButton] = useState<SortType>(SortType.DEFAULT);
  const [reversed, setReversed] = useState<boolean>(false);

  const sortGoods = (type: SortType) => {
    setActiveButton(type);
  };

  const toggleReverse = () => {
    setReversed(!reversed);
  };

  const resetGoods = () => {
    setReversed(false);
    setActiveButton(SortType.DEFAULT);
  };

  const sortedGoods = getSortedGoods(goodsFromServer, sortValue, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortValue !== SortType.ALPHABETICALLY,
          })}
          onClick={() => {
            sortGoods(SortType.ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            sortGoods(SortType.LENGTH);
          }}
          type="button"
          className={cn('button is-success', {
            'is-light': sortValue !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={toggleReverse}
          type="button"
          className={cn('button is-warning', { 'is-light': !reversed })}
        >
          Reverse
        </button>

        {(sortValue !== SortType.DEFAULT || reversed) && (
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
