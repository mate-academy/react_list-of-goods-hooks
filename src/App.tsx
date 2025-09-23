import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

// Lista original
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

// Enum para opções de ordenação
enum SortType {
  Default = 'DEFAULT',
  Alphabetical = 'ALPHABETICAL',
  Length = 'LENGTH',
  Reverse = 'REVERSE',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sortType, setSortType] = useState<SortType>(SortType.Default);

  const handleSort = (type: SortType) => {
    const sortedGoods = [...goodsFromServer]; // sempre parte da lista original

    switch (type) {
      case SortType.Alphabetical:
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.Length:
        sortedGoods.sort((a, b) => a.length - b.length);
        break;

      case SortType.Reverse:
        sortedGoods.reverse();
        break;

      case SortType.Default:
      default:
        // já inicializa com goodsFromServer
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
          className={`button is-info is-light ${sortType === SortType.Alphabetical ? 'is-active' : ''}`}
          onClick={() => handleSort(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success is-light ${sortType === SortType.Length ? 'is-active' : ''}`}
          onClick={() => handleSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning is-light ${sortType === SortType.Reverse ? 'is-active' : ''}`}
          onClick={() => handleSort(SortType.Reverse)}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button is-danger is-light ${sortType === SortType.Default ? 'is-active' : ''}`}
          onClick={() => handleSort(SortType.Default)}
        >
          Reset
        </button>
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
