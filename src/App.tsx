import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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
  None = 'NONE',
  Alphabetically = 'ALPHABETICALLY',
  ByLength = 'BY_LENGTH',
  Reverse = 'REVERSE',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([]);
  const [sortType, setSortType] = useState<SortType>(SortType.None);

  useEffect(() => {
    setGoods([...goodsFromServer]);
  }, []);

  const sortGoods = (type: SortType) => {
    const sortedGoods = [...goodsFromServer];

    switch (type) {
      case SortType.Alphabetically:
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.ByLength:
        sortedGoods.sort((a, b) => a.length - b.length);
        break;
      case SortType.Reverse:
        sortedGoods.sort((a, b) => b.localeCompare(a));
        break;
      case SortType.None:
      default:
        break;
    }

    setGoods(sortedGoods);
    setSortType(type);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info is-light ${sortType === SortType.Alphabetically ? 'is-active' : ''}`}
          onClick={() => sortGoods(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success is-light ${sortType === SortType.ByLength ? 'is-active' : ''}`}
          onClick={() => sortGoods(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning is-light ${sortType === SortType.Reverse ? 'is-active' : ''}`}
          onClick={() => sortGoods(SortType.Reverse)}
        >
          Reverse
        </button>

        {sortType !== SortType.None && (
          <button
            type="button"
            className="button is-danger is-light is-active"
            onClick={() => sortGoods(SortType.None)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
