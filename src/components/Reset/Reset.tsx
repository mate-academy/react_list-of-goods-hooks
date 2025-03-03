import React from 'react';
import { SortFields } from '../../App';

type SetBoolean = (value: boolean) => void;
type SetString = (value: SortFields | '') => void;

type ResetProps = {
  sortedField: SortFields | '';
  reversed: boolean;
  setReversed: SetBoolean;
  setSortedField: SetString;
};

export const Reset: React.FC<ResetProps> = ({
  sortedField,
  reversed,
  setReversed,
  setSortedField,
}) => {
  function getReset(setRev: SetBoolean, setSortField: SetString): void {
    setRev(false);
    setSortField('');
  }

  if (reversed || sortedField) {
    return (
      <button
        onClick={() => getReset(setReversed, setSortedField)}
        type="button"
        className="button is-danger is-light"
      >
        Reset
      </button>
    );
  }

  return null;
};
