import React from 'react';
import cn from 'classnames';

interface Props {
  children: string;
  classNames: string;
  onClick: React.MouseEventHandler;
  shouldHighlight?: boolean;
}

export const Button: React.FC<Props> = ({
  children,
  classNames,
  onClick,
  shouldHighlight,
}) => {
  return (
    <button
      type="button"
      className={cn(
        'button',
        classNames,
        { 'is-light': shouldHighlight },
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  shouldHighlight: true,
};
