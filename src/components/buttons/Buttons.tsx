import 'bulma/css/bulma.css';
import React from 'react';
import { SortType } from '../../types/SortType';

interface Props {
  isLight: string;
  activeButton: string;
  setActiveButton: (value: string) => void;
  resetVisible: boolean;
  setResetVisible: (value: boolean) => void;
  isReverse: boolean;
  setIsReverse: (value: boolean) => void;
  sortGoods: (field: SortType) => void;
}

export const Buttons: React.FC<Props> = ({
  isLight,
  activeButton,
  setActiveButton,
  resetVisible,
  setResetVisible,
  isReverse,
  setIsReverse,
  sortGoods,
}) => {
  const buttons: [SortType, string][] = [
    [SortType.Alphabetically, 'is-info'],
    [SortType.Length, 'is-success'],
  ];

  return (
    <div className="buttons">
      {buttons.map(([type, style]) => (
        <button
          key={type}
          type="button"
          className={`button ${style} ${activeButton !== type ? isLight : ''}`}
          onClick={() => {
            setActiveButton(type);
            sortGoods(type);
            setResetVisible(true);
          }}
        >
          {type}
        </button>
      ))}

      <button
        type="button"
        className={`button is-warning ${!isReverse ? isLight : ''}`}
        onClick={() => {
          sortGoods(SortType.Reverse);
        }}
      >
        Reverse
      </button>

      {resetVisible && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            sortGoods(SortType.Reset);
            setResetVisible(false);
            setActiveButton('');
            setIsReverse(false);
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
};
