import React, { useState } from 'react';
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

export enum SortType {
  Default = 'DEFAULT',
  Alphabetically = 'ALPHABETICALLY',
  Length = 'LENGTH',
  Reversed = 'REVERSED',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [sortType, setSortType] = useState<SortType>(SortType.Default);

  const handleSort = (type: SortType) => {
    let sortedGoods: string[];

    switch (type) {
      case SortType.Alphabetically:
        sortedGoods = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
        break;

      case SortType.Length:
        sortedGoods = [...goodsFromServer].sort((a, b) => a.length - b.length);
        break;

      case SortType.Reversed:
        sortedGoods = [...goodsFromServer].slice().reverse();
        break;

      case SortType.Default:
      default:
        sortedGoods = [...goodsFromServer];
        break;
    }

    setGoods(sortedGoods);
    setSortType(type);
  };

  const isDefaultOrder = goods.every((item, index) => item === goodsFromServer[index]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info is-light ${
            sortType === SortType.Alphabetically ? 'is-active' : ''
          }`}
          onClick={() => handleSort(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success is-light ${
            sortType === SortType.Length ? 'is-active' : ''
          }`}
          onClick={() => handleSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning is-light ${
            sortType === SortType.Reversed ? 'is-active' : ''
          }`}
          onClick={() => handleSort(SortType.Reversed)}
        >
          Reverse
        </button>

        {!isDefaultOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleSort(SortType.Default)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((item) => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
