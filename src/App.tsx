import React, { useState } from "react";
import "bulma/css/bulma.css";
import "./App.scss";
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
  NAME = "name",
  LENGTH = "length",
}

function getSortedFields(
  fields: string[],
  sortField: SortTypeAnnotation,
  isReversed: boolean,
) {
  const copiedGoods = [...fields];

  if (sortField === SortType.NAME) {
    copiedGoods.sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortField === SortType.LENGTH) {
    copiedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    copiedGoods.reverse();
  }

  return copiedGoods;
}

type SortTypeAnnotation = SortType | "";

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortTypeAnnotation>("");
  const [isReversed, setReserved] = useState(false);
  const showGoods = getSortedFields(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.NAME)}
          className={`button is-info ${cn({
            "is-light": sortField !== SortType.NAME,
          })}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.LENGTH)}
          className={cn("button is-success", {
            "is-light": sortField !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReserved(!isReversed)}
          className={cn("button is-warning", { "is-light": !isReversed })}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReserved(false);
              setSortField("");
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {showGoods.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
