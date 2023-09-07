import React, { useState } from 'react';
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
  NONE,
  ALPHABETICALLY,
  LENGTH,
}

const sortGoods = (sortType:SortType):string[] => goodsFromServer
  .sort((a:string, b:string) => {
    if (sortType === SortType.NONE) {
      return 0;
    }

    return sortType === SortType.ALPHABETICALLY
      ? a.localeCompare(b)
      : a.length - b.length;
  });

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const goods:string[] = !isReversed
    ? sortGoods(sortType)
    : sortGoods(sortType).reverse();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.ALPHABETICALLY && 'is-light'}`}
          onClick={() => setSortType(SortType.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.LENGTH && 'is-light'}`}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortType(SortType.NONE);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(good => <li key={good} data-cy="Good">{good}</li>)}
        </ul>
      </ul>
    </div>
  );
};
