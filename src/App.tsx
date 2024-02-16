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

const SORT_FIELD_ALPHABETICALLY = "alphabetically";
const SORT_LENGTH = "length";

function getPreparedGoods(
  goods: string[],
  sortField: string,
  reverseField: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_LENGTH:
          return good1.length - good2.length;

        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState("");
  const [reverseField, setReverseField] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    reverseField,
  );

  const reset = () => {
    setSortField("");
    setReverseField(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          className={cn("button is-info", {
            "is-light": sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn("button is-success", {
            "is-light": sortField !== SORT_LENGTH,
          })}
          onClick={() => setSortField(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn("button is-warning", {
            "is-light": reverseField === false,
          })}
          onClick={() => setReverseField((current) => !current)}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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
