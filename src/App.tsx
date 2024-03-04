import React, { useState } from "react";
import cn from "classnames";
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
  sortAlphabetically = "name",
  sortByLength = "length",
  reset = "",
}

// eslint-disable-next-line max-len
function getPreparedGoods(goods: string[], sortField: SortType) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.sortAlphabetically:
          return good1.localeCompare(good2);

        case SortType.sortByLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.reset);
  const [reversedField, setReversedField] = useState(false);

  const visableGoods = getPreparedGoods(goodsFromServer, sortField);
  // eslint-disable-next-line max-len
  const visableGoodsReverse = reversedField
    ? visableGoods.reverse()
    : visableGoods;

  const reset = () => {
    setSortField(SortType.reset);
    setReversedField(false);
  };

  const reverse = () => setReversedField(!reversedField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn("button", "is-info", {
            "is-light": sortField !== SortType.sortAlphabetically,
          })}
          onClick={() => setSortField(SortType.sortAlphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn("button", "is-success", {
            "is-light": sortField !== SortType.sortByLength,
          })}
          onClick={() => setSortField(SortType.sortByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn("button", "is-warning", {
            "is-light": reversedField === false,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortField || reversedField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visableGoodsReverse.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
