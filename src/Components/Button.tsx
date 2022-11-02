import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const Button: React.FC<Props> = ({ children, ...props }) => {
  return (
    <button
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};
