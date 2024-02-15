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

const SORT_BY_NAME = "alphabet";
const SORT_BY_LENGTH = "length";
const SORT_BY_DEFAULT = "";

function getPrepareGoods(
  goods: string[],
  { sortField, reverse }: { sortField: string; reverse: boolean },
) {
  let prepareGoods = [...goods];

  if (sortField) {
    prepareGoods = prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_NAME:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1[sortField] - good2[sortField];
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    prepareGoods = prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState("");
  const [reverse, setReverse] = useState(false);
  const switcherReset = sortField || reverse;

  const visibleGoods = getPrepareGoods(goodsFromServer, { sortField, reverse });

  const resetAll = () => {
    setReverse(false);
    setSortField(SORT_BY_DEFAULT);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn("button is-info", {
            "is-light": sortField !== SORT_BY_NAME,
          })}
          onClick={() => setSortField(SORT_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn("button is-success", {
            "is-light": sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverse((content) => !content)}
          className={cn("button is-warning", {
            "is-light": !reverse,
          })}
        >
          Reverse
        </button>

        {switcherReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetAll}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
