import React from 'react';
import { ResetSortProps } from '../../types/buttons/ResetSortProps';
import { SortType } from '../../Enums/SortType';

export const ResetSort: React.FC<ResetSortProps> = ({
  setSortBy,
  setIsReversed,
}) => {
  return (
    <button
      type="button"
      className="button is-danger is-light"
      onClick={() => {
        setSortBy(SortType.INITIAL);
        setIsReversed(false);
      }}
    >
      Reset
    </button>
  );
};
