import React, { useState } from "react";
import "bulma/css/bulma.css";
import "./App.scss";
import cn from "classnames";

enum Sort {
  ALPHABETICALLY = "alpha",
  BY_LENGTH = "length",
  REVERSE = "reverse",
  RESET = "reset",
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

type Goods = string[];

const getSortedGoods = (
  goods: Goods,
  sortMethod: string,
  isReversed: boolean
) => {
  let newGoods = [...goods];

  switch (sortMethod) {
    case Sort.ALPHABETICALLY:
      newGoods = newGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case Sort.BY_LENGTH:
      newGoods.sort().sort((good1, good2) => good1.length - good2.length);
      break;
    case Sort.RESET:
      newGoods = [...goodsFromServer];
      break;
    default:
      return isReversed ? newGoods.reverse() : newGoods;
  }

  return isReversed ? newGoods.reverse() : newGoods;
};

export const App: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState("");
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods = getSortedGoods(goodsFromServer, selectedSort, isReversed);

  const isResetHidden = !selectedSort && !isReversed;

  const handleSortChange = (eventName: Sort) => {
    if (eventName !== selectedSort) {
      setSelectedSort(eventName);
    }

    if (eventName === Sort.RESET) {
      setSelectedSort("");
      setIsReversed(false);

      return;
    }
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            "button " +
            cn({
              "is-info": selectedSort === Sort.ALPHABETICALLY,
              "is-info is-light": selectedSort !== Sort.ALPHABETICALLY,
            })
          }
          onClick={() => handleSortChange(Sort.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            "button " +
            cn({
              "is-success": selectedSort === Sort.BY_LENGTH,
              "is-success is-light": selectedSort !== Sort.BY_LENGTH,
            })
          }
          onClick={() => handleSortChange(Sort.BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            "button " +
            cn({
              "is-warning": isReversed,
              "is-warning is-light": !isReversed,
            })
          }
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isResetHidden && (
          <button
            type="button"
            className={
              "button " +
              cn({
                "is-danger": selectedSort === Sort.RESET,
                "is-danger is-light": selectedSort !== Sort.RESET,
              })
            }
            onClick={() => handleSortChange(Sort.RESET)}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {sortedGoods.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
