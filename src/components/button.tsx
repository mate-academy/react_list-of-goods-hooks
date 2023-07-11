import React from 'react';

type Props = {
  className: string,
  children: string,
  // eslint-disable-next-line
  [key: string]: any,
};

export const Button: React.FC<Props> = ({
  className,
  children,
  ...props
}) => (
  <button
    type="button"
    className={`${className}`}
    {...props}
  >
    {children}
  </button>
);
