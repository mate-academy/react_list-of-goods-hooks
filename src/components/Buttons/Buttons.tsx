import cn from "classnames";

import { SortType, SortDirection } from "../../constants";

type Props = {
  sortAlphabetically: () => void;
  sortByLength: () => void;
  reverse: () => void;
  reset: () => void;
  order: SortType;
  direction: SortDirection;
};

export const Buttons: React.FC<Props> = ({
  sortAlphabetically,
  sortByLength,
  reverse,
  reset,
  order,
  direction,
}) => (
  <div className="buttons">
    <button
      type="button"
      className={cn("button", "is-info", {
        "is-light": order !== SortType.ALPHABETICALLY,
      })}
      onClick={sortAlphabetically}
    >
      Sort alphabetically
    </button>

    <button
      type="button"
      className={cn("button", "is-success", {
        "is-light": order !== SortType.BY_LENGTH,
      })}
      onClick={sortByLength}
    >
      Sort by length
    </button>

    <button
      type="button"
      className={cn("button", "is-warning", {
        "is-light": direction !== SortDirection.OPPOSITE,
      })}
      onClick={reverse}
    >
      Reverse
    </button>

    {(direction !== SortDirection.DIRECTLY || order !== SortType.BY_DEFAULT) && (
      <button
        type="button"
        className="button is-danger is-light"
        onClick={reset}
      >
        Reset
      </button>
    )}
  </div>
);
