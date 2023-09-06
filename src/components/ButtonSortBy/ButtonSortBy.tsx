import { FC } from 'react';
import cn from 'classnames';

import { TButtonInfo, TOnSortByHandler } from '../../types/SortByButtons';

type TSortByProps = {
  buttonInfo: TButtonInfo;
  onSortByHandler: TOnSortByHandler;
  sortBy: string;
};

export const ButtonSortBy: FC<TSortByProps> = ({
  buttonInfo,
  onSortByHandler,
  sortBy,
}) => (
  <button
    type="button"
    onClick={() => {
      onSortByHandler(buttonInfo.name);
    }}
    className={
      cn(buttonInfo.ownClass, {
        'is-light': sortBy !== buttonInfo.name,
      })
    }
  >
    {buttonInfo.name}
  </button>
);
