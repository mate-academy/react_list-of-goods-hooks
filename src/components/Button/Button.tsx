import cn from 'classnames';
import React from 'react';

type Props = {
  click: React.MouseEventHandler<HTMLButtonElement>;
  condition: boolean;
  mainClass: string;
  title: string;
};

export const Button: React.FC<Props> = ({
  click,
  condition,
  mainClass,
  title,
}) => {
  return (
    <button
      type="button"
      onClick={click}
      className={cn(`button ${mainClass}`, {
        'is-light': condition,
      })}
    >
      {title}
    </button>
  );
};
