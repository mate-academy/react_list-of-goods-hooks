import React from 'react';

interface Props {
  name: string,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  className: string,
}

export class Button extends React.PureComponent<Props, {}> {
  render(): React.ReactNode {
    const {
      name,
      className,
      onClick,
    } = this.props;

    return (
      <button
        type="button"
        className={className}
        onClick={onClick}
      >
        {name}
      </button>
    );
  }
}
