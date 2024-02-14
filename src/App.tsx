import React, { useState } from "react";
import "bulma/css/bulma.css";
import "./App.scss";
import cn from "classnames";
import { SortType } from "./types/SortType";
import { SortOptions } from "./types/SortOptions";

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

function sortGoods(goods: string[], { query, reversed }: SortOptions) {
  const goodsToSort: string[] = [...goods];

  goodsToSort.sort((a, b) => {
    switch (query) {
      case SortType.alphabetical:
        return a.localeCompare(b);
      case SortType.length:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  return reversed ? goodsToSort.reverse() : goodsToSort;
}

export const App: React.FC = () => {
  const [query, setQuery] = useState<SortType>(SortType.default);
  const [reversed, setReversed] = useState(false);
  const goods = sortGoods(goodsFromServer, { query, reversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn("button", "is-info", {
            "is-light": query !== SortType.alphabetical,
          })}
          onClick={() => setQuery(SortType.alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn("button", "is-success", {
            "is-light": query !== SortType.length,
          })}
          onClick={() => setQuery(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn("button", "is-warning", {
            "is-light": !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>
        {(query !== SortType.default || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setQuery(SortType.default);
              setReversed(false);
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
