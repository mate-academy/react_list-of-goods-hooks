import { FC } from 'react';
import cn from 'classnames';

import { TButtonInfo, TSortHandler } from '../../types/SortByButtons';

type TSortButton = {
  buttonInfo: TButtonInfo;
  onSortByHandler: TSortHandler;
  sortBy: string;
};

export const SortButton: FC<TSortButton> = ({
  buttonInfo,
  onSortByHandler,
  sortBy,
}) => (
  <button
    type="button"
    onClick={() => onSortByHandler(buttonInfo.name)}
    className={
      cn(buttonInfo.ownClass, {
        'is-light': sortBy !== buttonInfo.name,
      })
    }
  >
    {buttonInfo.name}
  </button>
);
