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
      ...rest
    } = this.props;

    return (
      <button
        type="button"
        {...rest}
      >
        {name}
      </button>
    );
  }
}
