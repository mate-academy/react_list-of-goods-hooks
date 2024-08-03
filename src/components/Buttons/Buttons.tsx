import React from 'react';
import cn from 'classnames';
import { SortMethod } from '../../types/SortMethod';

type Props = {
  sortMethod: SortMethod;
  setCurrentSortMethod: (method: SortMethod) => void;
  isReversed: boolean;
  toggleOrderReversed: (isReversed: boolean) => void;
};

export const Buttons: React.FC<Props> = ({
  sortMethod,
  setCurrentSortMethod,
  isReversed,
  toggleOrderReversed,
}) => {
  return (
    <div className="buttons">
      <button
        type="button"
        className={cn('button is-info', {
          'is-light': sortMethod !== SortMethod.alphabetically,
        })}
        onClick={() => setCurrentSortMethod(SortMethod.alphabetically)}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={cn('button is-success', {
          'is-light': sortMethod !== SortMethod.byLength,
        })}
        onClick={() => setCurrentSortMethod(SortMethod.byLength)}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={cn('button is-warning', { 'is-light': !isReversed })}
        onClick={() => toggleOrderReversed(!isReversed)}
      >
        Reverse
      </button>

      {(sortMethod || isReversed) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            toggleOrderReversed(false);
            setCurrentSortMethod(SortMethod.default);
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
};
