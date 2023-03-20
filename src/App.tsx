import React, { useState } from "react";
import "bulma/css/bulma.css";
import "./App.scss";

export const goodsFromServer = [
  "Dumplings",
  "Carrot",
  "Eggs",
  "Ice cream",
  "Apple",
  "Bread",
  "Fish",
  "Honey",
  "Jam",
  "Garlic",
];

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType;
  isReversed: boolean;
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  visibleGoods.sort((g1, g2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return g1.localeCompare(g2);
      case SortType.LENGTH:
        return g1.length - g2.length;

      default:
        return 0;
    }
  });

  if (isReversed === true) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setType] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);
  const isSortedDescending = sortType === SortType.NONE && !isReversed;

  const goods = getReorderedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortType !== SortType.ALPHABET
              ? "button is-info is-light"
              : "button is-info"
          }
          onClick={() => setType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortType !== SortType.LENGTH
              ? "button is-success is-light"
              : "button is-success"
          }
          onClick={() => setType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={ !isReversed
            ? "button is-warning is-light"
            : "button is-warning"}
          onClick={() => setReverse(!isReversed)}
        >
          Reverse
        </button>

        {!isSortedDescending && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setType(SortType.NONE);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map((good) => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
