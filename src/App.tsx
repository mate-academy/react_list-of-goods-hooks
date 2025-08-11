import React from 'react';
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
  'Garlic',
];

enum SortType {
  Default = 'Default',
  Alphabetical = 'Alphabetical',
  ByLength = 'ByLength',
  Reverse = 'Reverse',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = React.useState<SortType>(SortType.Default);

  const sortedGoods = React.useMemo(() => {
    switch (sortType) {
      case SortType.Alphabetical:
        return [...goodsFromServer].sort((a, b) => a.localeCompare(b));
      case SortType.ByLength:
        return [...goodsFromServer].sort((a, b) => a.length - b.length);
      case SortType.Reverse:
        return [...goodsFromServer].slice().reverse();
      default:
        return goodsFromServer;
    }
  }, [sortType]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabetical ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.ByLength ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortType === SortType.Reverse ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.Reverse)}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button is-danger ${sortType === SortType.Default ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.Default)}
        >
          Reset
        </button>
      </div>

      <ul>
        {sortedGoods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
