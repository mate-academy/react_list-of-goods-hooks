import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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
];

enum SortType {
  alphabetically = 'alphabetically',
  length = 'length',
}

function sortGoods(
  goods: string[],
  sortType: SortType | null,
  reverse: boolean
) {
  const sortedGoods = [...goods];

  if (sortType) {
    sortedGoods.sort((a, b) => {
      switch (sortType) {
        case SortType.alphabetically:
          return a.localeCompare(b);
          case SortType.length:
            return a.length - b.length;
            default:
              return 0;
            }
          });
        }

  return reverse ? sortedGoods.reverse() : sortedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType | null>(null);
  const [isReverse, setIsReverse] = useState(false);
  const sortedGoods = sortGoods(goodsFromServer, sortType, isReverse);

  const handleClick = () => {
    setSortType(null);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn("button", "is-info", {
            "is-light": sortType !== SortType.alphabetically
          })}
          onClick={() => setSortType(SortType.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn("button", "is-success", {
            "is-light": sortType !== SortType.length
          })}
          onClick={() => setSortType(SortType.length)}
        >
          Sort by length
        </button>

        <button
            type="button"
            className={cn("button", "is-warning", {
              "is-light": !isReverse
            })}
            onClick={() => setIsReverse(!isReverse)}
          >
            Reverse
          </button>

        {(sortType || isReverse) && (
          <button
            type="button"
            className={cn("button", "is-danger", "is-light")}
            onClick={handleClick}
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
