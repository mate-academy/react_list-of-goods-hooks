import cn from 'classnames';
import { ReverseListProps } from '../../types/buttons/ReverseListProps';
import React from 'react';

export const ReverseList: React.FC<ReverseListProps> = ({
  isReversed,
  setIsReversed,
}) => {
  return (
    <button
      type="button"
      className={cn('button is-warning', {
        'is-light': !isReversed,
      })}
      onClick={() => setIsReversed(!isReversed)}
    >
      Reverse
    </button>
  );
};
