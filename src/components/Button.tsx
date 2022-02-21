import React from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
type typeOfBtn = {
  clicked: () => void,
  name: string,
};

export const Button: React.FC<typeOfBtn> = ({ clicked, name }) => {
  return (
    <button type="button" onClick={clicked}>{name}</button>
  );
};
