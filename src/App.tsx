import React, { useEffect, useState } from "react";
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

export function getReorderedGoods(
  goods: string[],
  sortType: string,
  isReversed: boolean,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  visibleGoods.sort((good1: string, good2: string): number => {
    if (sortType === "ALPHABET") {
      return good1.localeCompare(good2);
    }

    if (sortType === "LENGTH") {
      return good1.length - good2.length;
    }

    if (sortType === "NONE") {
      return 0;
    }

    return 0;
  });
  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState("NONE");
  const [isReversed, setIsReversed] = useState(false);
  const goodies = getReorderedGoods(goodsFromServer, sortType, isReversed);

  useEffect(() => {}, [isReversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortType !== "ALPHABET"
              ? "button is-info is-light"
              : "button is-info"
          }
          onClick={() => setSortType("ALPHABET")}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortType === "LENGTH"
              ? "button is-success"
              : "button is-success is-light"
          }
          onClick={() => setSortType("LENGTH")}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            !isReversed ? "button is-warning is-light" : "button is-warning"
          }
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {sortType !== "NONE" || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortType("NONE");
            }}
          >
            Reset
          </button>
        ) : undefined}
      </div>

      <ul>
        <ul>
          {goodies.map((good) => {
            return (
              <li data-cy="Good" key={good}>
                {good}
              </li>
            );
          })}
        </ul>
      </ul>
    </div>
  );
};
