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
  NONE = "none",
  ALPHABETICALLY = "alphabetically",
  LENGTH = "length",
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const isOriginalOrder =
    goods.length === goodsFromServer.length &&
    goods.every((good, index) => good === goodsFromServer[index]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABETICALLY ? "" : "is-light"}`}
          onClick={() => {
            const sortedGoods = [...goodsFromServer].sort();

            if (isReversed) {
              sortedGoods.reverse();
            }

            setGoods(sortedGoods);
            setSortType(SortType.ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? "" : "is-light"}`}
          onClick={() => {
            const sortedGoods = [...goodsFromServer].sort(
              (a, b) => a.length - b.length,
            );

            if (isReversed) {
              sortedGoods.reverse();
            }

            setGoods(sortedGoods);
            setSortType(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? "" : "is-light"}`}
          onClick={() => {
            setGoods([...goods].reverse());
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setGoods([...goodsFromServer]);
              setSortType(SortType.NONE);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
