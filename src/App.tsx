import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
  Default,
  Alphabet,
  Length,
}

function getPreparedGoods(goods: string[], sortMethod: SortType) {
  const goodsCopy = [...goods];

  if (sortMethod) {
    goodsCopy.sort((good1, good2) => {
      switch (sortMethod) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return goodsCopy;
}

export const App = () => {
  const [currentSort, setCurrentSort] = useState(SortType.Default);
  let renderedGoods = getPreparedGoods(goodsFromServer, currentSort);
  const [isReversed, setIsReversed] = useState(false);

  if (isReversed) {
    renderedGoods = renderedGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${currentSort === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={() => {
            setCurrentSort(SortType.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${currentSort === SortType.Length ? '' : 'is-light'}`}
          onClick={() => {
            setCurrentSort(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(currentSort || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setCurrentSort(SortType.Default);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {renderedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
