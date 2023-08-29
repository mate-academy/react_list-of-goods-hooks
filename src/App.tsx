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

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleSort = (newSort: SortType) => setSortType(newSort);

  const handleReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  useEffect(() => {
    const reorderGoods = () => {
      const goodsCopy = [...goodsFromServer];

      if (sortType === SortType.ALPHABET) {
        goodsCopy.sort((a, b) => a.localeCompare(b));
      } else if (sortType === SortType.LENGTH) {
        goodsCopy.sort((a, b) => a.length - b.length);
      }

      if (isReversed) {
        goodsCopy.reverse();
      }

      setVisibleGoods(goodsCopy);
    };

    reorderGoods();
  }, [sortType, isReversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.ALPHABET ? "" : "is-light"
          }`}
          onClick={() => handleSort(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === SortType.LENGTH ? "" : "is-light"
          }`}
          onClick={() => handleSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning  ${isReversed ? "" : "is-light"}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
