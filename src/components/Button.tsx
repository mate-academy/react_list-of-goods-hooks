import React from 'react';

type Props = {
  active?: boolean;
  styleClass: string;
  onClick: () => void;
  children: string;
};

const Button: React.FC<Props> = ({ active, styleClass, onClick, children }) => {
  return (
    <button
      type="button"
      className={`button ${styleClass} ${active ? '' : 'is-light'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
