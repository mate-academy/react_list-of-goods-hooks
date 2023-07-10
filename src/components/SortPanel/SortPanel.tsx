import React from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';

import { SortField } from '../../types/SortField';

type Callback = (prev: boolean) => boolean;

type SortPanelData = {
  sortField: SortField,
  isReverse: boolean,
  setSortField: (sortField: SortField) => void,
  setIsReverse: (arg: Callback | boolean) => void,
};

type Props = {
  sortPanelData: SortPanelData,
};

export const SortPanel: React.FC<Props> = ({
  sortPanelData: {
    sortField,
    isReverse,
    setSortField,
    setIsReverse,
  },
}) => {
  const isShowResetButton = sortField || isReverse;

  const reset = () => {
    setSortField(SortField.Default);
    setIsReverse(false);
  };

  const toggleReverse = () => {
    setIsReverse(prev => !prev);
  };

  const handleAlphabetSort = () => {
    setSortField(SortField.Alphabet);
  };

  const handleLengthSort = () => {
    setSortField(SortField.Length);
  };

  return (
    <div className="buttons">
      <button
        onClick={handleAlphabetSort}
        type="button"
        className={cn('button', 'is-info', {
          'is-light': sortField !== SortField.Alphabet,
        })}
      >
        Sort alphabetically
      </button>

      <button
        onClick={handleLengthSort}
        type="button"
        className={cn('button', 'is-success', {
          'is-light': sortField !== SortField.Length,
        })}
      >
        Sort by length
      </button>

      <button
        onClick={toggleReverse}
        type="button"
        className={cn('button', 'is-warning', {
          'is-light': !isReverse,
        })}
      >
        Reverse
      </button>

      {isShowResetButton && (
        <button
          onClick={reset}
          type="button"
          className="button is-danger is-light"
        >
          Reset
        </button>
      )}
    </div>
  );
};
