import React, { useState } from "react";
import cn from "classnames";

import "bulma/css/bulma.css";
import "./App.scss";

enum SortType {
  ByLength = "byLength",
  Alphabetically = "alphabetically",
  DEFAULT = "",
}

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

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ByLength:
          return good1.length - good2.length;

        case SortType.Alphabetically:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  const handleReverseClick = () => {
    setIsReversed(!isReversed);
  };

  const handleResetClick = () => {
    setSortField(SortType.DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.Alphabetically)}
          className={cn("button", "is-info", {
            "is-light": sortField !== SortType.Alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.ByLength)}
          type="button"
          className={cn("button", "is-info", {
            "is-light": sortField !== SortType.ByLength,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverseClick}
          className={cn("button", "is-warning", { "is-light": !isReversed })}
        >
          Reverse
        </button>

        {(sortField !== "" || isReversed) && (
          <button
            type="button"
            onClick={handleResetClick}
            className="button is-danger is-light"
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
