import React from "react";
import { SortType } from "../enums";

type Props = {
  sortBy: SortType;
  reversedList: boolean;
  onSortByAlphabet: () => void;
  onSortByLength: () => void;
  onReverse: () => void;
  onReset: () => void;
};

export const Buttons: React.FC<Props> = ({
  sortBy,
  reversedList,
  onSortByAlphabet,
  onSortByLength,
  onReverse,
  onReset,
}) => (
  <div className="buttons">
    <button
      type="button"
      className={`button is-info ${sortBy !== SortType.Alphabet ? "is-light" : ""}`}
      onClick={onSortByAlphabet}
    >
      Sort alphabetically
    </button>

    <button
      type="button"
      className={`button is-success ${sortBy !== SortType.Length ? "is-light" : ""}`}
      onClick={onSortByLength}
    >
      Sort by length
    </button>

    <button
      type="button"
      className={`button is-warning ${!reversedList ? "is-light" : ""}`}
      onClick={onReverse}
    >
      Reverse
    </button>

    {(sortBy !== SortType.None || reversedList) && (
      <button
        type="button"
        className="button is-danger is-light"
        onClick={onReset}
      >
        Reset
      </button>
    )}
  </div>
);
