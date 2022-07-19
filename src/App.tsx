/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import './App.css';

const goodsFromServer = [
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
  NONE = 'NONE',
  ALPHABET = 'ALPHABET',
  LENGTH = 'LENGTH',
}

export const App: React.FC = () => {
  const [isStarted, setStarted] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  function handleReset() {
    setReversed(false);
    setSortType(SortType.NONE);
  }

  function getReorderedGoods(
    goods: string[],
    sortBy: SortType,
  ): string[] {
    const showedGoods = [...goods];

    switch (sortBy) {
      case SortType.ALPHABET:
        showedGoods.sort(
          (currentProduct, nextProduct) => (
            currentProduct.localeCompare(nextProduct)
          ),
        );
        break;

      case SortType.LENGTH:
        showedGoods.sort(
          (currentProduct, nextProduct) => (
            currentProduct.length - nextProduct.length
          ),
        );
        break;

      default:
        break;
    }

    if (isReversed) {
      return showedGoods.reverse();
    }

    return showedGoods;
  }

  const showedGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
  );

  return (
    <div className="App">
      {!isStarted
      && (
        <button
          className="button button--start"
          type="button"
          onClick={() => {
            setStarted(!isStarted);
          }}
        >
          Start
        </button>
      )}

      {isStarted
      && (
        <>
          <button
            className="button"
            type="button"
            onClick={() => {
              setSortType(SortType.ALPHABET);
            }}
          >
            Sort alphabetically
          </button>

          <button
            className="button"
            type="button"
            onClick={() => {
              setSortType(SortType.LENGTH);
            }}
          >
            Sort by length
          </button>

          <button
            className="button"
            type="button"
            onClick={() => {
              setReversed(!isReversed);
            }}
          >
            Reverse
          </button>

          <button
            className="button button--reset"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>

          <ul className="Goods">
            {showedGoods.map(product => (
              <li
                className="Goods__item"
                key={product}
              >
                {product}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
