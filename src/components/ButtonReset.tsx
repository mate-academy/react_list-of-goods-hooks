import React from 'react';

interface ButtonResetProps {
  onClick: () => void;
}

export const ButtonReset: React.FC<ButtonResetProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      className="button is-danger is-light"
      onClick={onClick}
    >
      Reset
    </button>
  );
};
