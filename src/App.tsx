import React, { useState } from "react";
import classNames from "classnames";
import "bulma/css/bulma.css";
import "./App.scss";

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
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

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
): string[] {
  const visibleGoods = [...goods];

  visibleGoods.sort((itemOne: string, itemTwo: string): number => {
    switch (sortType) {
      case SortType.ALPHABET:
        return itemOne.localeCompare(itemTwo);
      case SortType.LENGTH:
        return itemOne.length - itemTwo.length;
      case SortType.NONE:
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
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const goodies = getReorderedGoods(goodsFromServer, sortType, isReversed);

  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames("button is-info", {
            "is-light": sortType !== SortType.ALPHABET,
          })}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames("button is-success", {
            "is-light": sortType !== SortType.LENGTH,
          })}
          onClick={() => setSortType(SortType.LENGTH)}
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
        {sortType !== SortType.NONE || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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
