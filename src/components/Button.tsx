import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const Button: React.FC<Props> = ({ children, className, ...props }) => (
  <button
    type="button"
    className={`button ${className}`}
    {...props}
  >
    {children}
  </button>
);
