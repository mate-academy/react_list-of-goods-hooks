import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum Goods {
  Dumplings = 'Dumplings',
  Carrot = 'Carrot',
  Eggs = 'Eggs',
  IceCream = 'Ice cream',
  Apple = 'Apple',
  Bread = 'Bread',
  Fish = 'Fish',
  Honey = 'Honey',
  Jam = 'Jam',
  Garlic = 'Garlic',
}

enum SortType {
  Alphabetically = 'ALPHABETICALLY',
  ByLength = 'BY_LENGTH',
}

export const goodsFromServer: Goods[] = [
  Goods.Dumplings,
  Goods.Carrot,
  Goods.Eggs,
  Goods.IceCream,
  Goods.Apple,
  Goods.Bread,
  Goods.Fish,
  Goods.Honey,
  Goods.Jam,
  Goods.Garlic,
];

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType | null>(null);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const getSortedGoods = (): Goods[] => {
    const result = [...goodsFromServer];

    if (sortType === SortType.Alphabetically) {
      result.sort((a, b) => a.localeCompare(b));
    }

    if (sortType === SortType.ByLength) {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  };

  const goods = getSortedGoods();

  const isOriginOrder = () => !sortType && !isReversed;

  const handleSortAlphabetically = () => {
    setSortType(sortType === SortType.Alphabetically ? null : SortType.Alphabetically);
  };

  const handleSortByLength = () => {
    setSortType(sortType === SortType.ByLength ? null : SortType.ByLength);
  };

  const handleToggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortType(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.Alphabetically ? 'is-active' : 'is-light'
          }`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.ByLength ? 'is-active' : 'is-light'
          }`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? 'is-active' : 'is-light'}`}
          onClick={handleToggleReverse}
        >
          Reverse
        </button>

        {!isOriginOrder() && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
