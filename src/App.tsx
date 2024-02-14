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
  none = "",
  alphabet = "alphabet",
  length = "length",
}

function getPrepare(arr: string[], sortField: SortType, reverseField: boolean) {
  const prepareArr = [...arr];

  if (sortField) {
    prepareArr.sort((good1, good2) => {
      switch (sortField) {
        case SortType.alphabet:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    prepareArr.reverse();
  }

  return prepareArr;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.none);
  const [reverseField, setReverseField] = useState(false);

  const visebl = getPrepare(goodsFromServer, sortField, reverseField);

  const reset = () => {
    setSortField(SortType.none);
    setReverseField(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          // className="button is-info is-light"
          className={cn("button is-info", {
            "is-light": sortField !== SortType.alphabet,
          })}
          onClick={() => setSortField(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          // className="button is-success is-light"
          className={cn("button is-success", {
            "is-light": sortField !== SortType.length,
          })}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          // className="button is-warning is-light"
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
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visebl.map((element) => (
          <li data-cy="Good" key={element}>
            {element}
          </li>
        ))}
      </ul>
    </div>
  );
};
