import classNames from "classnames";
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

export function getReorderedGoods(
  goods: string[],
  sortType: string,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((itemOne: string, itemTwo: string): number => {
    switch (sortType) {
      case "ALPHABET":
        return itemOne.localeCompare(itemTwo);
      case "LENGTH":
        return itemOne.length - itemTwo.length;
      default:
        return 0;
    }
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

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames("button is-info", {
            "is-light": sortType !== "ALPHABET",
          })}
          onClick={() => setSortType("ALPHABET")}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames("button is-success", {
            "is-light": sortType !== "LENGTH",
          })}
          onClick={() => setSortType("LENGTH")}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames("button is-warning", {
            "is-light": !isReversed,
          })}
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
