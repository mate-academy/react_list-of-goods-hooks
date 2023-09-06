import { FC } from 'react';
import cn from 'classnames';

import {
  EButtonsSortBy, TButtonInfo, TOnSortByHandler,
} from '../../types/SortByButtons';

import { ButtonSortBy } from '../ButtonSortBy';

type TButtonsSortByList = {
  onSortByHandler: TOnSortByHandler;
  onReverseHandler: () => void;
  sortBy: string;
  isReversed: boolean;
};

const buttons: TButtonInfo[] = [
  {
    name: EButtonsSortBy.Alphabet,
    ownClass: 'button is-info',
  },
  {
    name: EButtonsSortBy.Length,
    ownClass: 'button is-success',
  },
  {
    name: EButtonsSortBy.Reset,
    ownClass: 'button is-warning',
  },
];

export const ButtonsSortByList: FC<TButtonsSortByList> = ({
  onSortByHandler,
  sortBy,
  onReverseHandler,
  isReversed,
}) => (
  <div className="buttons">
    {buttons.map((button) => (
      <ButtonSortBy
        key={button.name}
        buttonInfo={button}
        sortBy={sortBy}
        onSortByHandler={onSortByHandler}
      />
    ))}

    <button
      type="button"
      onClick={() => onReverseHandler()}
      className={
        cn('button is-danger', {
          'is-light': !isReversed,
        })
      }
    >
      Reverse
    </button>
  </div>
);
