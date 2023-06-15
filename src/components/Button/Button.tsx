import classNames from 'classnames';
import React from 'react';

type Props = {
  styles: {},
  callback: () => void,
};

export const Button: React.FC<Props> = (props) => {
  const { styles, callback } = props;

  return (
    <button
      type="button"
      className={classNames(
        'button',
        styles,
      )}
      onClick={callback}
    >
      {props.children}
    </button>
  );
};
