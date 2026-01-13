import React from 'react';

type Props = {
  onSortAlphabetically: () => void;
  onSortByLength: () => void;
  onReverse: () => void;
  onReset: () => void;
  isResetVisible: boolean;
  isAlphabetActive: boolean;
  isLengthActive: boolean;
  isReverseActive: boolean;
};

export const ButtonsPanel: React.FC<Props> = ({
  onSortAlphabetically,
  onSortByLength,
  onReverse,
  onReset,
  isResetVisible,
  isAlphabetActive,
  isLengthActive,
  isReverseActive,
}) => (
  <div className="buttons">
    <button
      type="button"
      className={`button is-info ${isAlphabetActive ? '' : 'is-light'}`}
      onClick={onSortAlphabetically}
    >
      Sort alphabetically
    </button>

    <button
      type="button"
      className={`button is-success ${isLengthActive ? '' : 'is-light'}`}
      onClick={onSortByLength}
    >
      Sort by length
    </button>

    <button
      type="button"
      className={`button is-warning ${isReverseActive ? '' : 'is-light'}`}
      onClick={onReverse}
    >
      Reverse
    </button>

    {isResetVisible && (
      <button
        type="button"
        className="button is-danger is-light"
        onClick={onReset}
      >
        Reset
      </button>
    )}
  </div>
);
