import cn from 'classnames';
import { SortType } from '../interfaces/SortType';

type Props = {
  isResetButtonVisible: string | boolean;
  handleClickReset: () => void;
  handleClickSelect: (value: SortType) => void;
  handleClickReverse: () => void;
  sortField: string;
  reverse: boolean;
};

export const Buttons: React.FC<Props> = ({
  isResetButtonVisible,
  handleClickReset,
  handleClickSelect,
  handleClickReverse,
  sortField,
  reverse,
}) => {
  return (
    <div className="buttons">
      <button
        onClick={() => handleClickSelect(SortType.name)}
        type="button"
        className={
          cn('button', 'is-info', {
            'is-light': sortField !== SortType.name,
          })
        }
      >
        Sort alphabetically
      </button>

      <button
        onClick={() => handleClickSelect(SortType.length)}
        type="button"
        className={
          cn('button', 'is-info', {
            'is-light': sortField !== SortType.length,
          })
        }
      >
        Sort by length
      </button>

      <button
        onClick={handleClickReverse}
        type="button"
        className={cn('button', 'is-warning', { 'is-light': !reverse })}
      >
        Reverse
      </button>

      {isResetButtonVisible
        && (
          <button
            onClick={handleClickReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
    </div>
  );
};
