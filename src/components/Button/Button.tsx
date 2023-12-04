import React from 'react';

type Props = {
  classStr?: string,
  click: React.MouseEventHandler<HTMLButtonElement>,
  text: string
};

export const Button: React.FC<Props> = ({ classStr, click, text }) => (
  <button
    type="button"
    className={`button ${classStr}`}
    onClick={click}
  >
    {text}
  </button>
);
