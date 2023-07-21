import React from 'react';

interface Props {
  resetGoods: () => void;
}

export const Reset: React.FC<Props> = ({ resetGoods }) => (
  <button
    type="button"
    onClick={resetGoods}
    className="button is-danger is-light"
  >
    Reset
  </button>
);
