import React from 'react';
import cn from 'classnames';
import { Sort } from '../../types/Sort';
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
          'is-light': sortMethod !== Sort.alphabetically,
        })}
        onClick={() => setCurrentSortMethod(Sort.alphabetically)}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={cn('button is-success', {
          'is-light': sortMethod !== Sort.byLength,
        })}
        onClick={() => setCurrentSortMethod(Sort.byLength)}
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
            if (isReversed) {
              toggleOrderReversed(false);
            }

            setCurrentSortMethod('');
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
};
