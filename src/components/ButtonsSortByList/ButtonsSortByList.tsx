import { FC } from 'react';
import cn from 'classnames';

import {
  ESortButtons, TButtonInfo, TSortHandler,
} from '../../types/SortByButtons';

import { SortButton } from '../ButtonSortBy';

type TSortButtons = {
  onSortByHandler: TSortHandler;
  handleButtonReverse: () => void;
  handleButtonReset: () => void;
  sortBy: string;
  isReversed: boolean;
};

const buttons: TButtonInfo[] = [
  {
    name: ESortButtons.Alphabet,
    ownClass: 'button is-info',
  },
  {
    name: ESortButtons.Length,
    ownClass: 'button is-success',
  },
];

export const SortButtons: FC<TSortButtons> = ({
  onSortByHandler,
  sortBy,
  handleButtonReverse,
  isReversed,
  handleButtonReset,
}) => {
  const isResetButtonActive = (sortBy || isReversed);

  return (
    <div className="buttons">
      {buttons.map((button) => (
        <SortButton
          key={button.name}
          buttonInfo={button}
          sortBy={sortBy}
          onSortByHandler={onSortByHandler}
        />
      ))}

      <button
        type="button"
        onClick={() => handleButtonReverse()}
        className={
          cn('button', 'is-warning', {
            'is-light': !isReversed,
          })
        }
      >
        Reverse
      </button>

      {isResetButtonActive && (
        <button
          type="button"
          onClick={() => handleButtonReset()}
          className="button is-danger is-light"
        >
          Reset
        </button>
      )}
    </div>
  );
};
