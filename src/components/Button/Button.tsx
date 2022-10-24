import React from 'react';
import classNames from 'classnames';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;

};

export const Button: React.FC<Props> = (props) => {
  const {
    children,
    className,
    ...rest
  } = props;

  return (
    <button
      type="button"
      className={classNames('button', className)}
      {...rest}
    >
      {children}
    </button>
  );
};
