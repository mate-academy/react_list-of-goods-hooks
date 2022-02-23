import React from 'react';

type TypeOfBtn = {
  clicked: () => void,
  name: string,
};

export const Button: React.FC<TypeOfBtn> = ({ clicked, name }) => {
  return (
    <button type="button" className="waves-effect waves-light btn-flat" onClick={clicked}>{name}</button>
  );
};
