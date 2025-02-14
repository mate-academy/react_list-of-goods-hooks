import { buttons } from '../commons/buttons';
import { SortType } from '../types/SortType';

type ButtonProps = {
  sortType: SortType;
  reverse: boolean;

  setSortType: (sortType: SortType) => void;
  setReverse: (reverse: boolean) => void;
};

export const Button = ({
  sortType,
  reverse,
  setSortType,
  setReverse,
}: ButtonProps) => {
  return buttons({
    sortType,
    reverse,
    setSortType,
    setReverse,
  }).map(({ text, style, variant, onClick }) => {
    if (text !== 'Reset') {
      return (
        <button
          key={text}
          type="button"
          className={`button ${style} ${variant}`}
          onClick={onClick}
        >
          {text}
        </button>
      );
    }

    if (sortType !== SortType.default || reverse) {
      return (
        <button
          key={text}
          type="button"
          className={`button ${style} ${variant}`}
          onClick={onClick}
        >
          {text}
        </button>
      );
    }

    return;
  });
};
