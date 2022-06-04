import React from 'react';
import './ButtonGenerator.scss';

type Props = {
  name: string,
  method:() => void,
};

export const ButtonGenerator:React.FC<Props> = ({ name, method }) => (
  <button
    type="button"
    className="button is-success is-light is-outlined is-rounded"
    onClick={method}
  >
    {name}
  </button>
);
