import classNames from 'classnames';
import React from 'react';

type Props = {
  type: string,
  active: boolean,
  callback: () => void,
};

export const Button: React.FC<Props> = (props) => {
  const { type, active, callback } = props;

  return (
    <button
      type="button"
      className={classNames(`button ${type}`, {
        'is-light': active,
      })}
      onClick={callback}
    >
      {props.children}
    </button>
  );
};
