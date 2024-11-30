import React from 'react';

type Props = {
  type: string;
  onClick: () => void;
  isLight: boolean;
  children: string;
};

export const Button: React.FC<Props> = ({
  type,
  onClick,
  isLight,
  children,
}) => (
  <button
    type="button"
    className={`button ${type} ${isLight ? 'is-light' : ''}`}
    onClick={onClick}
  >
    {children}
  </button>
);
