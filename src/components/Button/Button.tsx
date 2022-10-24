import React from 'react';
import classNames from 'classnames';

interface Props {
  children: string;
  styleClass: string;
  onClick: React.MouseEventHandler;
  isLightCondition?: boolean;
}

export const Button: React.FC<Props> = ({
  children,
  styleClass,
  onClick,
  isLightCondition,
}) => {
  return (
    <button
      type="button"
      className={classNames(
        'button',
        styleClass,
        { 'is-light': isLightCondition },
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  isLightCondition: true,
};
