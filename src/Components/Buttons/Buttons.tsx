import cn from 'classnames';
import { FC } from 'react';
import { ReverseField, SortFields } from '../../types';

interface Props {
  sortField: SortFields,
  setSortField: (sortField: SortFields) => void,
  reverse: ReverseField,
  setReverse: (reverse: ReverseField) => void,
  resetButton: () => void,
  isActiveButton: boolean,
}

export const Buttons: FC<Props> = (props) => {
  const {
    sortField,
    setSortField,
    reverse,
    setReverse,
    resetButton,
    isActiveButton,
  } = props;

  return (
    <div className="buttons">
      <button
        type="button"
        className={cn('button is-info', {
          'is-light': sortField !== SortFields.SortByAphabet,
        })}
        onClick={() => setSortField(SortFields.SortByAphabet)}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={cn('button is-success', {
          'is-light': sortField !== SortFields.SortByLength,
        })}
        onClick={() => setSortField(SortFields.SortByLength)}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={cn('button is-warning',
          { 'is-light': reverse === ReverseField.Noreverse })}
        onClick={() => (reverse === ReverseField.Reverse
          ? setReverse(ReverseField.Noreverse)
          : setReverse(ReverseField.Reverse))}
      >
        Reverse
      </button>
      {(isActiveButton) && (
        <button
          type="button"
          className={cn('button is-danger', { 'is-light': isActiveButton })}
          onClick={resetButton}
        >
          Reset
        </button>
      )}

    </div>
  );
};
