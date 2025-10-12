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
  None = 'none',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const getSortedGoods = (): string[] => {
    let sortedGoods = [...goodsFromServer];

    switch (sortType) {
      case SortType.Alphabetically:
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.Length:
        sortedGoods.sort((a, b) => a.length - b.length);
        break;

      default:
        break;
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  function setClassName()

  const visibleGoods = getSortedGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {'is-light': sortType !== SortType.Alphabetically})}
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {'is-light': sortType !== SortType.Length})}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {'is-light': isReversed !== true})}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>
        {(isReversed || sortType !== SortType.None) &&
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.None);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
