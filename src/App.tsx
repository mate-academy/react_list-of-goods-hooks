import "bulma/css/bulma.css";
import "./App.scss";
import React, { useState } from "react";
import cn from "classnames";

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
  alphabet = "alphabet",
  length = "length",
  none = "",
}

const sortBy = (goods: string[], sortMethod: SortType) => {
  const preparedGoods = [...goods];

  switch (sortMethod) {
    case SortType.alphabet:
      preparedGoods.sort((a, b) => a.localeCompare(b));

      return preparedGoods;
    case SortType.length:
      preparedGoods.sort((a, b) => a.length - b.length);

      return preparedGoods;
    default:
      return preparedGoods;
  }
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.none);
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = sortBy(goodsFromServer, sortField);
  const visibleGoods = isReversed ? sortedGoods.reverse() : sortedGoods;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn("button", "is-info", {
            "is-light": sortField !== SortType.alphabet,
          })}
          onClick={() => setSortField(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn("button", "is-success", {
            "is-light": sortField !== SortType.length,
          })}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn("button", "is-warning", {
            "is-light": !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.none);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
