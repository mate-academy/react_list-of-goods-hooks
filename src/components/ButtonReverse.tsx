import React from 'react';
import cn from 'classnames';

interface ButtonReverseProps {
  onClick: () => void;
  reverseField: boolean;
}

export const ButtonReverse: React.FC<ButtonReverseProps> = ({
  onClick,
  reverseField,
}) => (
  <button
    type="button"
    className={cn('button is-warning',
      { 'is-light': !reverseField })}
    onClick={onClick}
  >
    Reverse
  </button>
);
