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
  Alphabet,
  Length,
  Reverse,
  Default
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [reverseStatus, setReverseStatus] = useState(false);

  let sortGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortType) {
      case SortType.Alphabet:
        return good1.localeCompare(good2);
      case SortType.Length:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reverseStatus) {
    sortGoods = [...sortGoods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortType(SortType.Alphabet);
          }}
          type="button"
          className={`button is-info ${sortType === SortType.Alphabet ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortType(SortType.Length);
          }}
          type="button"
          className={`button is-success ${sortType === SortType.Length ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReverseStatus(prev => !prev);
          }}
          type="button"
          className={`button is-warning ${reverseStatus ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortType !== SortType.Default || reverseStatus) && (
          <button
            onClick={() => {
              setSortType(SortType.Default);
              setReverseStatus(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
      {sortGoods.map(good => {
        return (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        );
      })}
      </ul>
    </div>
  );
};
