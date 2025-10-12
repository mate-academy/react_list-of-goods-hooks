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

export enum SortType {
  NONE = 'none',
  ALPHA_ASC = 'alpha_asc',
  LENGTH_ASC = 'length_asc',
  REVERSE = 'reverse',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = React.useState<SortType>(SortType.NONE);
  const [goods, setGoods] = React.useState<string[]>(goodsFromServer);

  const handleSort = (type: SortType) => {
    setSortType(type);

    switch (type) {
      case SortType.ALPHA_ASC:
        setGoods([...goodsFromServer].sort((a, b) => a.localeCompare(b)));
        break;

      case SortType.LENGTH_ASC:
        setGoods([...goodsFromServer].sort((a, b) => a.length - b.length));
        break;

      case SortType.REVERSE:
        setGoods([...goods].reverse());
        break;

      case SortType.NONE:
        setGoods(goodsFromServer);
        break;

      default:
        setGoods(goodsFromServer);
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.ALPHA_ASC ? 'is-light' : ''}`}
          onClick={() => handleSort(SortType.ALPHA_ASC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortType !== SortType.LENGTH_ASC ? 'is-light' : ''}`}
          onClick={() => handleSort(SortType.LENGTH_ASC)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${sortType !== SortType.REVERSE ? 'is-light' : ''}`}
          onClick={() => handleSort(SortType.REVERSE)}
        >
          Reverse
        </button>

        {sortType !== SortType.NONE && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleSort(SortType.NONE)}
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
