//..
import type { SortType } from '../../App';
type ButtonsProps = {
  sortAlph: () => void;
  sortLeng: () => void;
  resetArr: () => void;
  isReverseActive: boolean;
  activeSort: SortType;
  isResetVisible: boolean;
  onReverse: () => void;
};

export const Buttons = ({
  sortAlph,
  sortLeng,
  resetArr,
  isReverseActive,
  activeSort,
  isResetVisible,
  onReverse,
}: ButtonsProps) => {
  return (
    <div className="buttons">
      <button
        type="button"
        className={
          activeSort === 'alphabet'
            ? 'button is-success'
            : 'button is-success is-light'
        }
        onClick={sortAlph}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={
          activeSort === 'length'
            ? 'button is-success'
            : 'button is-success is-light'
        }
        onClick={sortLeng}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={
          isReverseActive === true
            ? 'button is-warning'
            : 'button is-warning is-light'
        }
        onClick={onReverse}
      >
        Reverse
      </button>
      {isResetVisible === true ? (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={resetArr}
        >
          Reset
        </button>
      ) : (
        false
      )}
    </div>
  );
};
